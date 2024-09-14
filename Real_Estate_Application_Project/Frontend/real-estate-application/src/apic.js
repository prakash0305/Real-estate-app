import axios from 'axios';

const BASE_URL = 'http://localhost:5062/api/Comparison';

export const compareProperties = (titles) => {
  const params = new URLSearchParams();
  titles.forEach((title, index) => {
    params.append(`title${index + 1}`, title);
  });
  return axios.get(`${BASE_URL}/compare-by-title?${params.toString()}`);
};
