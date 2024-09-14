import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './PropertyCard.css'; // Import the CSS file for card styling

const PropertyCard = ({ property }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();

  // Check if the property is favorited when the component mounts
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorited(favorites.includes(property.title));
  }, [property.title]);

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!property.title) {
      console.error("Invalid property title");
      return;
    }

    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((title) => title !== property.title);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      // Add to favorites
      favorites.push(property.title);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorited(true);
      alert("Added to favorites");
    }
  };

  return (
    <Card className="property-card">
      <Card.Img variant="top" src={`http://localhost:5261/images/${property.image}`} className="card-img" />
      <Card.Body className="d-flex flex-column">
        <div className="card-content">
          <div className="favorite-icon-container" onClick={toggleFavorite}>
            {isFavorited ? <FaHeart className="favorite-icon" /> : <FaRegHeart className="favorite-icon" />}
          </div>
          <Card.Title>{property.title}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> {property.price}<br />
            <strong>Location:</strong> {property.location}<br />
            <strong>Size:</strong> {property.size} sq ft<br />
            <strong>Bedrooms:</strong> {property.numberOfBedrooms}<br />
            <strong>Status:</strong> {property.status}
          </Card.Text>
        </div>
        <div className="card-footer mt-auto">
          <strong>Description:</strong> {property.description}<br />
          <strong>Agent:</strong> {property.agent.name}<br />
          <strong>Contact:</strong> {property.agent.contact}<br />
          <strong>Email:</strong> {property.agent.email}<br />
          <a href="/contact" className="contact-link" style={{color:'red'}}>CONTACT</a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
