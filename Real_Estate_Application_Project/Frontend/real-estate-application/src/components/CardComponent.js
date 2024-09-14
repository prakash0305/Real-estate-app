// src/components/CardComponent.js
import React from 'react';

const CardComponent = ({ imgSrc, title, text }) => {
  return (
    <div className="col">
      <div className="card">
        
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
