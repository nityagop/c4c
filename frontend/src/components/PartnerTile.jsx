import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/
function PartnerTile({ partnerData, onDelete }) {
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
