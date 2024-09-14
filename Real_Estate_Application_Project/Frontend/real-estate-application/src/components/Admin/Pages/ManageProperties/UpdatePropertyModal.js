// UpdatePropertyModal.js
import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UpdatePropertyModal = ({ show, onHide, property, onUpdate }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    location: Yup.string().required('Location is required'),
    size: Yup.number().positive('Size must be positive').required('Size is required'),
    numberOfBedrooms: Yup.number().positive('Number of bedrooms must be positive').required('Number of bedrooms is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Image is required'),
    agent: Yup.object({
      name: Yup.string().required('Agent name is required'),
      contact: Yup.string().required('Agent contact is required'),
      email: Yup.string().email('Invalid email address').required('Agent email is required')
    }).required('Agent details are required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onUpdate(values);
    setSubmitting(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={property || {
            title: '',
            price: '',
            location: '',
            size: '',
            numberOfBedrooms: '',
            status: '',
            description: '',
            image: '',
            agent: {
              name: '',
              contact: '',
              email: ''
            }
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Field
                  type="text"
                  name="title"
                  className="form-control"
                />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Field
                  type="number"
                  name="price"
                  className="form-control"
                />
                <ErrorMessage name="price" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Field
                  type="text"
                  name="location"
                  className="form-control"
                />
                <ErrorMessage name="location" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formSize">
                <Form.Label>Size</Form.Label>
                <Field
                  type="number"
                  name="size"
                  className="form-control"
                />
                <ErrorMessage name="size" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formNumberOfBedrooms">
                <Form.Label>Number of Bedrooms</Form.Label>
                <Field
                  type="number"
                  name="numberOfBedrooms"
                  className="form-control"
                />
                <ErrorMessage name="numberOfBedrooms" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Field
                  type="text"
                  name="status"
                  className="form-control"
                />
                <ErrorMessage name="status" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Field
                  type="text"
                  name="image"
                  className="form-control"
                />
                <ErrorMessage name="image" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formAgentName">
                <Form.Label>Agent Name</Form.Label>
                <Field
                  type="text"
                  name="agent.name"
                  className="form-control"
                />
                <ErrorMessage name="agent.name" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formAgentContact">
                <Form.Label>Agent Contact</Form.Label>
                <Field
                  type="text"
                  name="agent.contact"
                  className="form-control"
                />
                <ErrorMessage name="agent.contact" component="div" className="text-danger" />
              </Form.Group>

              <Form.Group controlId="formAgentEmail">
                <Form.Label>Agent Email</Form.Label>
                <Field
                  type="email"
                  name="agent.email"
                  className="form-control"
                />
                <ErrorMessage name="agent.email" component="div" className="text-danger" />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="mt-3"
              >
                Update Property
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePropertyModal;
