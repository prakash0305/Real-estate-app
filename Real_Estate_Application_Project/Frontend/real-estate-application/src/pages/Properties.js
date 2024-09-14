import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PropertyCard from '../components/PropertyCard';
import SearchForm from '../components/Auth/SearchForm';
import { 
  fetchProperties, 
  fetchPropertiesByLocation, 
  fetchPropertiesByStatus, 
  fetchPropertiesByPriceRange, 
  fetchPropertiesBySizeRange 
} from '../apii';
import './PropertyPage.css'; // Import the CSS file for styling

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // New state for no results

  const handleSearch = async (query, searchType) => {
    setLoading(true);
    setError(null);
    setNoResults(false);
    try {
      let data;
      switch (searchType) {
        case 'location':
          data = await fetchPropertiesByLocation(query);
          break;
        case 'status':
          data = await fetchPropertiesByStatus(query);
          break;
        case 'price':
          const [minPrice, maxPrice] = query.split(',').map(Number);
          if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < 0) {
            throw new Error('Invalid price range');
          }
          data = await fetchPropertiesByPriceRange(minPrice, maxPrice);
          break;
        case 'size':
          const [minSize, maxSize] = query.split(',').map(Number);
          if (isNaN(minSize) || isNaN(maxSize) || minSize < 0 || maxSize < 0) {
            throw new Error('Invalid size range');
          }
          data = await fetchPropertiesBySizeRange(minSize, maxSize);
          break;
        default:
          data = [];
      }
      if (data.length === 0) {
        setNoResults(true); // Set no results flag if data is empty
      } else {
        setProperties(data);
      }
    } catch (error) {
      setError(error.message || 'Error fetching properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch all properties initially
    fetchProperties().then(setProperties).catch((error) => setError('Error fetching properties'));
  }, []);

  return (
    <div className="property-page" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/backcc.jpg)` }}>
      <Container>
        <h1 className="my-4 text-center text-white">Welcome to the Property Catalogue</h1>
        <p className="lead text-center text-white">Find your dream home with us.</p>
        <SearchForm onSearch={handleSearch} />
        {loading && <p className="text-center">Loading...</p>}
        {error && <Alert variant="danger">{error}</Alert>}
        {noResults && <Alert variant="info">No properties found matching your criteria.</Alert>}
        <Row className="property-grid">
          {properties.map((property) => (
            <Col key={property.id} md={4} className="mb-4">
              <PropertyCard property={property} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PropertyPage;
