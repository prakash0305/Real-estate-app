// src/components/Admin/Pages/ViewEnquiries/reducers/index.js

import { combineReducers } from 'redux';
import contactAgentReducer from './contactAgentReducer'; // Ensure this path is correct

const rootReducer = combineReducers({
  contactAgents: contactAgentReducer,
});

export default rootReducer;
