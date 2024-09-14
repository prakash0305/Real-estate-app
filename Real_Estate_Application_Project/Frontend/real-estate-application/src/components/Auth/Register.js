import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-50" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/back.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <Formik
        initialValues={{
          role: '',
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object({
          role: Yup.string().required('Role is required'),
          name: Yup.string()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters')
            .required('Name is required'),
          email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
          phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
            .required('Phone number is required'),
          password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.post('/register', {
              userName: values.name,
              email: values.email,
              password: values.password,
              role: values.role,
              phoneNumber: values.phone,
            });
            alert('Registration Successful');
            navigate('/');
          } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-4 border rounded shadow-sm" style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white' }}>
            <h1 className="mb-4">Register</h1>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <Field as="select" id="role" name="role" className="form-control">
                <option value="" label="Select a role" />
                <option value="User" label="User" />
                {/* <option value="Admin" label="Admin" /> */}
              </Field>
              <ErrorMessage name="role" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <Field id="name" name="name" type="text" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field id="email" name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <Field id="phone" name="phone" type="text" className="form-control" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field id="password" name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Field id="confirmPassword" name="confirmPassword" type="password" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Register
            </button>
            <div className="mt-3 text-center">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
