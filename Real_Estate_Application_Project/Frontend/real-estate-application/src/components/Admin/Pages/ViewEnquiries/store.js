// src/components/Admin/Pages/ViewEnquiries/store.js

import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for redux-thunk
import rootReducer from './index'; // Ensure this path is correct

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
