const API_BASE_URL = 'http://localhost:5261/api'; // Update with your actual API base URL

// Fetch all properties
export const fetchProperties = async (endpoint = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties${endpoint ? '/' + endpoint : ''}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    throw error;
  }
};

// Fetch properties by location
export const fetchPropertiesByLocation = async (location) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/by-location/${encodeURIComponent(location)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch properties by location:', error);
    throw error;
  }
};

// Fetch properties by status
export const fetchPropertiesByStatus = async (status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/by-status/${encodeURIComponent(status)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch properties by status:', error);
    throw error;
  }
};

// Fetch properties by price range
export const fetchPropertiesByPriceRange = async (minPrice, maxPrice) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/by-price?minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch properties by price range:', error);
    throw error;
  }
};

// Fetch properties by size range
export const fetchPropertiesBySizeRange = async (minSize, maxSize) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/by-size?minSize=${encodeURIComponent(minSize)}&maxSize=${encodeURIComponent(maxSize)}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch properties by size range:', error);
    throw error;
  }
};
