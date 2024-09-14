// src/components/Admin/Pages/ViewEnquiries/reducers/contactAgentReducer.js

const initialState = {
    contactAgents: [],
  };
  
  const contactAgentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CONTACT_AGENTS_SUCCESS':
        return {
          ...state,
          contactAgents: action.payload,
        };
      case 'UPDATE_CONTACT_AGENT_STATUS':
        return {
          ...state,
          contactAgents: state.contactAgents.map(agent =>
            agent.id === action.payload.id
              ? { ...agent, status: action.payload.status }
              : agent
          ),
        };
      default:
        return state;
    }
  };
  
  export default contactAgentReducer;
  