import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { AuthContext } from '../Auth/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/properties">Properties</Link></li>
          <li><Link to="/comparison">Comparison</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {/* <li><Link to="/favourites">Favourites</Link></li>
          <li><Link to="/notifications">Notifications</Link></li> */}
          <li><Link to="/profile">Profile</Link></li>
          {auth.token && (
            <li>
              <button className="btn btn-outline-light" onClick={() => {
                handleLogout();
                navigate('/'); // Ensure navigation to home after logout
              }}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
