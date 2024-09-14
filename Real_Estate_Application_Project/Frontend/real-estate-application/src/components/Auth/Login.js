import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure correct path
import axios from '../../api'; // Ensure correct path
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-50" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/back.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('/login', {
              email: values.email,
              password: values.password
            });

            if (response.status === 200) {
              const { token, username, role } = response.data;

              setAuth({
                email: values.email,
                token: token,
                role: role
              });
              localStorage.setItem('token', token);
              localStorage.setItem('email', values.email);
              localStorage.setItem('username', username);
              localStorage.setItem('role', role);

              // Redirect based on role
              if (role === 'Admin') {
                navigate('/admin-dashboard');
              } else {
                navigate('/home');
              }
            } else {
              setLoginError('Login failed. Please check your credentials.');
            }
          } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setLoginError('Login failed. Please check your credentials.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-4 border rounded shadow-sm" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'white' }}>
            <h1 className="mb-4">Login</h1>
            {loginError && <div className="alert alert-danger">{loginError}</div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field id="email" name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field id="password" name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Login
            </button>
            <div className="mt-3 text-center">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
