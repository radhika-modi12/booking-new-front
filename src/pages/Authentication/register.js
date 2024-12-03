import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../css/style.css'; // Import your CSS file
import api from '../../../src/axiosConfig';
import { useState } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Register = () => {
    const [message, setMessage] = useState('');
    const validationSchema = Yup.object({
      first_name: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .required('First name is required'),
      last_name: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    });

  const handleSubmit = async(values) => {
    // Handle form submission
    try {
        const response = await api.post('/auth/register', values); // API endpoint for user registration
        // setMessage('User registered successfully!');  
        toastr.success('User registered successfully!', 'Success');
        window.location.href ='/login'
      } catch (error) {
        console.log(error);
        if (error.response) {
          toastr.error(error.response.data.message, 'Error');
          // setMessage(error.response.data.message || 'Registration failed');
        } else {
          setMessage('An error occurred: ' + error.message);
        }
      }       
  };

  return (
    
    <Formik
      initialValues={{ first_name: '',last_name: '',email: '',password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form-container">
          <div className="form-group">
            <Field
              type="text"
              name="first_name"
              placeholder="first_name"
              className="input-field"
            />
            <ErrorMessage
              name="first_name"
              component="div"
              className="error-message"
            />
          </div>  
        
          <div className="form-group">
            <Field
              type="text"
              name="last_name"
              placeholder="last_name"
              className="input-field"
            />
            <ErrorMessage
              name="last_name"
              component="div"
              className="error-message"
            />
          </div>         
          <div className="form-group">
            <Field
              type="email"
              name="email"
              placeholder="email"
              className="input-field"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <Field
              type="text"
              name="password"
              placeholder="password"
              className="input-field"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />
          </div>    
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
