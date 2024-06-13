import React, { useState, useEffect } from 'react';
import PartnerTile from './PartnerTile'; // Ensure the path is correct

function Dashboard() {
  const [partners, setPartners] = useState({});

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch('http://localhost:4000/partners');
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error('Failed to fetch partners', err);
    }
  };

  const addPartner = async (newPartner) => {
    try {
      const res = await fetch('http://localhost:4000/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPartner),
      });
      if (res.ok) {
        fetchPartners();
      }
    } catch (err) {
      console.error('Failed to add partner', err);
    }
  };

  const deletePartner = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/partners/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchPartners();
      }
    } catch (err) {
      console.error('Failed to delete partner', err);
    }
  };

  const toggleActiveState = async (id, active) => {
    try {
      const res = await fetch(`http://localhost:4000/partners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active }),
      });
      if (res.ok) {
        fetchPartners();
      }
    } catch (err) {
      console.error('Failed to update partner', err);
    }
  };

  return (
    <div id="main-content">
      <h1>Partners</h1>
      <AddPartnerForm onAddPartner={addPartner} />
      <div id="main-partners-grid">
        {Object.entries(partners).map(([id, partner]) => (
          <PartnerTile 
            key={id} 
            partnerData={partner} 
            onDelete={() => deletePartner(id)} 
            onToggleActive={(active) => toggleActiveState(id, active)}
          />
        ))}
      </div>
    </div>
  );
}

function AddPartnerForm({ onAddPartner }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPartner({ id, name, description, thumbnailUrl });
    setId('');
    setName('');
    setDescription('');
    setThumbnailUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Partner Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Thumbnail URL"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        required
      />

      <input 
        type="checkbox" 
        
        checked={active} 
        onChange={(e) => onToggleActive(e.target.checked)} 
     
      />
      <button type="submit">Add Partner</button>
    </form>
  );
}

export default Dashboard;
