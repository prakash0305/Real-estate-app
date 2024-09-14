// src/components/Auth/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the path as necessary

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext); // Replace with the correct context value

  if (!auth.token) {
    // Redirect if not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render child routes
};

export default PrivateRoute;
