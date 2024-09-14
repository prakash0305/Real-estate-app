// src/pages/Contact.js
import React from 'react';
import ContactForm from '../components/Auth/ContactForm';
import './Contact.css'; // Import the CSS for Contact page

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="background-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cback.jpg)` }}>
        <b><h4 className='get'>Get In Touch With Us !</h4></b>
        <h1 className="contact-header">
          "Ready to explore your next home? 🏠<br/>

         "Let’s set up a time to visit! <br/>Pick a slot that works for you, and <br/>
          we’ll handle the rest. No hassle, just help finding your perfect place. 📅"

</h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
