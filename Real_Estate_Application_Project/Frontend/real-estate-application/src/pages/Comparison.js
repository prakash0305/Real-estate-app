import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import ComparisonForm from '../components/Auth/ComparisonForm';
import ComparisonTable from '../components/Auth/ComparisonTable';
import { compareProperties } from '../apic';

const ComparisonPage = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  const handleCompare = async (titles) => {
    try {
      const response = await compareProperties(titles);
      setProperties(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching comparison results');
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Compare Properties</h1>
      <ComparisonForm onCompare={handleCompare} />
      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
      <ComparisonTable properties={properties} />
    </Container>
  );
};

export default ComparisonPage;
