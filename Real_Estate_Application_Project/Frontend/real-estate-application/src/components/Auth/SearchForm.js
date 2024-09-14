import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('location'); // Default search type

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, searchType);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group controlId="searchType">
        <Form.Label>Search Type</Form.Label>
        <Form.Control
          as="select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="location">Location</option>
          <option value="status">Status</option>
          <option value="price">Price Range</option>
          <option value="size">Size Range</option>
          {/* <option value="title">Title</option> Added option for title search */}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="query">
        <Form.Label>Search Query</Form.Label>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
