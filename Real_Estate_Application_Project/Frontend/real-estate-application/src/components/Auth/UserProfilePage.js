// src/components/Auth/UserProfilePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const UserProfilePage = () => {
  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth.token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container">
      <h1>Hey! Welcome back {auth.email}</h1>
      {/* Your user profile content */}
    </div>
  );
};

export default UserProfilePage;
