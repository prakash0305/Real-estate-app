import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Table } from 'react-bootstrap';
import AddPropertyModal from './AddPropertyModel';
import UpdatePropertyModal from './UpdatePropertyModal';
import { useNavigate } from 'react-router-dom';
const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5261/api/Properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  };

  const handleAddProperty = async (newProperty) => {
    try {
      await axios.post('http://localhost:5261/api/Properties', newProperty);
       // Notify the admin or user via email
       await axios.post('http://localhost:5205/api/Mail', {
        ToEmail: 'prakashnaidu0308@gmail.com',
        ToName: 'Admin',
        Subject: 'New Property Added',
        Body: `<p>A new property has been added in our Vista Villas Please Visit the Page:</p>
        <p><strong>Title: </strong>${newProperty.title}</p>`
               
      });
      fetchProperties();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding property', error);
    }
  };
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // const mail={
  //   ToEmail:
  // }

  const handleUpdateProperty = async (title, updatedProperty) => {
    try {
      
      await axios.put(`http://localhost:5261/api/Properties/${title}`, updatedProperty);
      // Notify the admin or user via email
      await axios.post('http://localhost:5205/api/Mail', {
        ToEmail: 'prakashnaidu0308@gmail.com',
        ToName: 'Admin',
        Subject: 'Property is Updated! Price had been changed',
        Body: `<p>A property has been updated in our Vista Villas Please Visit:</p>
        <p><strong>Price: </strong>${updatedProperty.price}</p>`
               
      });
      
      fetchProperties();
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating property', error);
    }
  };

  const handleDeleteProperty = async (title) => {
    try {
      await axios.delete(`http://localhost:5261/api/Properties/${title}`);
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property', error);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowAddModal(true)} className="mb-3">Add Property</Button>
      <button className="back-button" onClick={handleBackClick} 
      style={{
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'fixed',
        right: '20px',   
        bottom: '20px',  
      }}>
        &larr; Back
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Location</th>
            <th>Size</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.title}>
              <td>{property.title}</td>
              <td>{property.price}</td>
              <td>{property.location}</td>
              <td>{property.size}</td>
              <td>{property.status}</td>

              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setSelectedProperty(property);
                    setShowUpdateModal(true);
                  }}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProperty(property.title)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddPropertyModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={handleAddProperty}
      />

      {selectedProperty && (
        <UpdatePropertyModal
          property={selectedProperty}
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          onUpdate={(updatedProperty) => handleUpdateProperty(selectedProperty.title, updatedProperty)}
        />
      )}
    </div>
  );
};

export default ManageProperties;
