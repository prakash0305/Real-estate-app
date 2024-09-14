import React from 'react';
import { Table } from 'react-bootstrap';

const ComparisonTable = ({ properties }) => {
  if (properties.length === 0) return null;

  return (
    <Table bordered hover className="mt-4">
      <tbody>
        {properties.map((property) => (
          <tr key={property.title}>
            <td>
              <strong>Title:</strong> {property.title}
              <br />
              {/* <img 
                src={property.image || 'path/to/default-image.jpg'} 
                alt={property.title} 
                style={{ width: '200px', height: 'auto' }} 
              /> */}
            </td>
            <td>
              <strong>Price:</strong> ${property.price.toLocaleString()}
            </td>
            <td>
              <strong>Location:</strong> {property.location}
            </td>
            <td>
              <strong>Size:</strong> {property.size} sq ft
            </td>
            <td>
              <strong>Bedrooms:</strong> {property.numberOfBedrooms}
            </td>
            <td>
              <strong>Status:</strong> {property.status}
            </td>
            <td>
              <strong>Description:</strong> {property.description}
            </td>
            <td>
              <strong>Agent Name:</strong> {property.agent.name}
            </td>
            <td>
              <strong>Agent Contact:</strong> {property.agent.contact}
            </td>
            <td>
              <strong>Agent Email:</strong> {property.agent.email}<br/>
              <a href="/contact" className="contact-link" style={{color:'red'}}>CONTACT</a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ComparisonTable;
