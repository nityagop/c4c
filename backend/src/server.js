import express from 'express';

const app = express();
const port = 4000;

// Some partner data
let partners = {
  "sftt": {
    "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
    "name": "Speak For The Trees",
    "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
    "active": true
  }
}

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Fetch all partners
app.get('/partners', (req, res) => {
  res.status(200).send(partners);
});

// Add a new partner
app.post('/partners', (req, res) => {
  const { id, name, description, thumbnailUrl } = req.body;
  if (partners[id]) {
    return res.status(400).send({ error: 'Partner with this ID already exists' });
  }
  partners[id] = { name, description, thumbnailUrl, active: true };
  res.status(201).send(partners[id]);
});

// Delete a partner by ID
app.delete('/partners/:id', (req, res) => {
  const { id } = req.params;
  if (!partners[id]) {
    return res.status(404).send({ error: 'Partner not found' });
  }
  delete partners[id];
  res.status(204).send();
});

// Update a partner's active state
app.put('/partners/:id', (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  if (!partners[id]) {
    return res.status(404).send({ error: 'Partner not found' });
  }
  partners[id].active = active;
  res.status(200).send(partners[id]);
});

app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
});
