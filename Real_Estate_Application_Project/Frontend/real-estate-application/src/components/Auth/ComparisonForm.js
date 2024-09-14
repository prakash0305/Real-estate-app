import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ComparisonForm = ({ onCompare }) => {
  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [title3, setTitle3] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const titles = [title1, title2, title3].filter(Boolean);

    if (titles.length < 2) {
      alert('Please enter at least two titles');
      return;
    }

    onCompare(titles);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formTitle1">
            <Form.Label>Property Title 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title1}
              onChange={(e) => setTitle1(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formTitle2">
            <Form.Label>Property Title 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title2}
              onChange={(e) => setTitle2(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formTitle3">
            <Form.Label>Property Title 3 (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title3}
              onChange={(e) => setTitle3(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">Compare</Button>
    </Form>
  );
};

export default ComparisonForm;
