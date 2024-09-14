// src/components/Admin/Pages/ViewEnquiries/actions/contactAgentActions.js

import axios from 'axios';

export const fetchContactAgents = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5219/api/ContactAgent');
    dispatch({
      type: 'FETCH_CONTACT_AGENTS_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching contact agents', error);
  }
};

export const updateContactAgentStatus = (id, status) => async dispatch => {
  try {
    // Since there's no PUT endpoint, we'll handle status update locally
    dispatch({
      type: 'UPDATE_CONTACT_AGENT_STATUS',
      payload: { id, status },
    });
  } catch (error) {
    console.error('Error updating contact agent status', error);
  }
};
