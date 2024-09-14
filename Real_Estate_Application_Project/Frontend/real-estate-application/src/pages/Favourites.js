import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import './favorites.css';
// import HeaderAdvanced from '../Navbars/HeaderAdvanced';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const favoriteTitles = JSON.parse(localStorage.getItem('favorites')) || [];

  useEffect(() => {
    axios.get('http://localhost:5261/api/properties')
      .then(response => {
        const favoriteProperties = response.data.filter(property => favoriteTitles.includes(property.title));
        setFavorites(favoriteProperties);
      })
      .catch(error => {
        console.error('Error fetching favorite properties:', error);
      });
  }, [favoriteTitles]);

  // Remove property from favorites
  const removeFromFavorites = (title) => {
    // Remove from localStorage
    const updatedFavorites = favoriteTitles.filter(favoriteTitle => favoriteTitle !== title);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Update the state to remove the property from the UI
    setFavorites(favorites.filter(property => property.title !== title));
  };

  return (
    <>
      {/* <HeaderAdvanced /> */}
      <div className="favorites-page">
        <h2>Your Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorite properties yet.</p>
        ) : (
          <div className="row">
            {favorites.map(property => (
              <div className="col-md-4 mb-4" key={property.title}> {/* Use title as the key */}
                <Card className="h-100">
                  <div className="favorite-remove-icon-container">
                    {/* Add a cross icon for removing the favorite */}
                    <span onClick={() => removeFromFavorites(property.title)} className="favorite-remove-icon">
                      <FaTimes style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }} />
                    </span>
                  </div>
                  <Card.Img variant="top" src={`http://localhost:5261/images/${property.image}`} alt={property.title} />
                  <Card.Body>
                    <Card.Title>{property.title}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> ${property.price} <br />
                      <strong>Location:</strong> {property.location} <br />
                      <strong>Size:</strong> {property.size} sq. ft. <br />
                      <strong>Bedrooms:</strong> {property.numberOfBedrooms} <br />
                      <strong>Status:</strong> {property.status} <br />
                      <strong>Description:</strong> {property.description}
                    </Card.Text>
                    <Link to={`/contact`}>
                      <Button variant="primary">Contact Agent</Button>
                    </Link>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Agent: {property.agent.name}</small> <br />
                    <small className="text-muted">Contact: {property.agent.contact}</small>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;