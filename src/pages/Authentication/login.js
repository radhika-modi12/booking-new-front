import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../../src/axiosConfig';

const Login = () => {
  const [message, setMessage] = useState('');

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await api.post('/auth/login', values); // Replace with your API endpoint
      console.log("data",response.data);
      setMessage('Login successful!');
      console.log('Token:', response.data.token); // Store the token if required
      localStorage.setItem('userId',response.data.id)
      localStorage.setItem('token', response.data.token); // Example of token storage
      window.location.href="/"
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Login failed');
      } else {
        setMessage('An error occurred: ' + error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Field
                type="text"
                name="email"
                placeholder="email"
                className="input-field"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              Login
            </button>
          </Form>
        )}
      </Formik>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default Login;
