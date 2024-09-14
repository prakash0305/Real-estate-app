// src/components/ContactForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api';
import '../../pages/Contact.css'; // Import the CSS file for ContactForm

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      scheduleTiming: '',
      agentEmail: '',
      message: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phoneNumber: Yup.string().required('Required'),
      agentEmail: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:5219/api/ContactAgent', values);
        alert('Contact details submitted successfully');
        resetForm();
      } catch (error) {
        console.error('There was an error submitting the form!', error);
      }
    },
  });

  return (
    <div className="contact-form-container">
      <div className="contact-form-box">
        <h2>Contact Us</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="error">{formik.errors.fullName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="error">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="scheduleTiming">Preferred Contact Time</label>
            <input
              id="scheduleTiming"
              name="scheduleTiming"
              type="datetime-local"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.scheduleTiming}
            />
          </div>
          <div className="form-group">
            <label htmlFor="agentEmail">Agent Email</label>
            <input
              id="agentEmail"
              name="agentEmail"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agentEmail}
            />
            {formik.touched.agentEmail && formik.errors.agentEmail ? (
              <div className="error">{formik.errors.agentEmail}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="error">{formik.errors.message}</div>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
