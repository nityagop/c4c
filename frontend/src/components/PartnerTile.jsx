import React from 'react';
//import './PartnerTile.css'; // Make sure the path is correct

function PartnerTile({ partnerData, onDelete, onToggleActive }) {
  const { name, description, thumbnailUrl, active } = partnerData;

  return (
    <div className="partner-tile">
      <img 
        src={thumbnailUrl} 
        alt={name} 
        className="partner-thumbnail" 
      />
      <h2>{name}</h2>
      <p>{description}</p>
      
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default PartnerTile;
