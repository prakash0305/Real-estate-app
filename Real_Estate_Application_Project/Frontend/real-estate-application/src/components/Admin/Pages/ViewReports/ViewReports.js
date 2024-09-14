import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Auth/AuthContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'chart.js/auto';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

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

  // Data for the pie chart
  const data = {
    labels: ['Total Properties', 'Total Agents', 'Total Enquiries'],
    datasets: [
      {
        label: 'Dashboard Metrics',
        data: [totalProperties, totalAgents, totalEnquiries],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart._metasets[0].total;
            const percentage = total > 0 ? (value / total * 100).toFixed(2) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

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
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Dashboard Metrics</Card.Title>
              <div className="chart-container">
                <Pie data={data} options={options} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      
    </div>
  );
};

export default AdminDashboard;
