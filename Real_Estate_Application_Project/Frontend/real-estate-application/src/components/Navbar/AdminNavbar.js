import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional, if you have specific styles

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin-dashboard">Admin Dashboard</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-settings">Settings</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
