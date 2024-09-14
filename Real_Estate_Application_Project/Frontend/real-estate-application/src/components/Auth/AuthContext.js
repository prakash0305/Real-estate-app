// src/components/Auth/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '', //role is added here!
    email:localStorage.getItem('email') || '',
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
