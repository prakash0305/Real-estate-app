// src/components/Navbar/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <div className="social-icons mt-2">
          <a href="https://twitter.com" className="text-white mx-2" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-white mx-2" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-white mx-2" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p className="mb-3 social-icons mt-2">&copy; {new Date().getFullYear()} Vista Villas @All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
