import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { FaHome, FaHeart, FaBell, FaUser, FaBars } from 'react-icons/fa'; // Import icons
import Sidebar from '../Sidebar/Sidebar'; // Import the Sidebar component

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setAuth({ token: '', email: '', username: '', role: '' });
    navigate('/'); // Navigate to the home page after logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check if the current route should hide the sidebar
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  // Determine if the user is an admin or a regular user
  const isAdmin = auth.role === 'Admin';

  return (
    <header className="bg-dark text-white py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <Link className="text-white text-decoration-none" to={isAdmin ? '/admin-dashboard' : '/'}>
            <h4>Vista Villas</h4>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          {/* Sidebar Toggle Button */}
          {!hideSidebar && (
            <button className="sidebar-toggle d-lg-none" onClick={toggleSidebar}>
              <FaBars />
            </button>
          )}
          <nav className={`d-none d-lg-block ${hideSidebar ? 'd-none' : ''}`}>
            <ul className="nav">
              {auth.token ? (
                <>
                  {isAdmin ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/admin-dashboard">
                          <FaHome /> Dashboard
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                        <Link className="nav-link text-white" to="/admin-settings">
                          Settings
                        </Link>
                      </li> */}
                      {/* Add more admin-specific links here */}
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/home">
                          <FaHome /> Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/properties">
                          Properties
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/comparison">
                          Comparison
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/contact">
                          Contact
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/favourites">
                          <FaHeart /> Favourites
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                        <Link className="nav-link text-white" to="/notifications">
                          <FaBell /> Notifications
                        </Link>
                      </li> */}
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/profile">
                          <FaUser /> Profile
                        </Link>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {!hideSidebar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />}
    </header>
  );
};

export default Header;
