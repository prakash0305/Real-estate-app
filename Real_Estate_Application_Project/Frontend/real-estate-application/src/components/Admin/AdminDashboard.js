import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = () => {
  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalAgents, setTotalAgents] = useState(0);
  const [totalEnquiries, setUserInteractions] = useState(0);

  // Redirect to login if no token is found
  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
    }
  }, [auth.token, navigate]);

  // Fetch the total number of properties, agents, and enquiries from the API
  useEffect(() => {
    if (!auth.token) return; // Exit early if no token

    const fetchData = async () => {
      try {
        // Fetch total properties
        const propertiesResponse = await axios.get('http://localhost:5261/api/Properties/total-properties');
        setTotalProperties(propertiesResponse.data.count);

        // Fetch total agents
        const agentsResponse = await axios.get('http://localhost:5261/api/Properties/total-properties'); // Correct API endpoint
        setTotalAgents(agentsResponse.data.count);

        // Fetch total enquiries
        const response = await fetch('http://localhost:5219/api/ContactAgent/count'); // Adjust the endpoint to your actual API
        const count = await response.json();
        setUserInteractions(count);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [auth.token]); // Dependency on auth.token ensures data is fetched when token is available

  if (!auth.token) {
    // Early return to prevent rendering if no token is present
    return null;
  }

  return (
    <div
      className="container mt-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/admin.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black'
      }}
    >
      <h1 className="mb-4">
        Welcome, {auth.username}! <br />
      </h1>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Properties</Card.Title>
              <Card.Text className="display-4">{totalProperties}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Agents</Card.Title>
              <Card.Text className="display-4">{totalAgents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Enquiries</Card.Title>
              <Card.Text className="display-4">{totalEnquiries}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Button variant="primary" href="/manage-properties" className="w-100">
            Manage Properties
          </Button>
        </Col>
        
        <Col md={3}>
          <Button variant="primary" href="/view-reports" className="w-100">
            View Reports
          </Button>
        </Col>
        <Col md={3}>
          <Button variant="primary" href="/view-enquiries" className="w-100">
            View Enquiries
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
