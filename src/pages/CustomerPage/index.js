import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../css/style.css'; // Import your CSS file
import api from '../../../src/axiosConfig';
import { useState } from 'react';

const CustomerPage = () => {
    const [message, setMessage] = useState('');
    const [customer, setCustomer] = useState({});
    
    const validationSchema = Yup.object({
        customer_name: Yup.string()
          .min(3, "Customer name must be at least 3 characters")
          .required("Customer name is required"),
        customer_email: Yup.string()
          .email("Invalid email address")
          .required("Customer email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        booking_date: Yup.string().required("Booking date is required"),
        booking_type: Yup.string().required("Booking type is required"),
        booking_slot: Yup.string().when("booking_type", {
          is: "half_day",
          then: Yup.string().required("Booking slot is required for Half Day"),
        }),
        booking_time: Yup.string().when("booking_type", {
          is: "custom",
          then: Yup.string().required("Booking time is required for Custom"),
        }),
    })

  const handleSubmit = async(values) => {
    // Handle form submission
    try {
      const customer_details = {customer_name: values.customer_name,customer_email: values.customer_email,booking_date: values.booking_date,booking_type: customer.booking_type,booking_time:values.booking_time,booking_slot:values.booking_slot}
        const response = await api.post('/customer/create_customer', customer_details); // API endpoint for user registration
        setMessage('Customer created successfully!');  
        window.location.href ='/login'
      } catch (error) {
        console.log(error);
        if (error.response) {
          setMessage(error.response.data.message || 'Registration failed');
        } else {
          setMessage('An error occurred: ' + error.message);
        }
      }       
  };

  const handleChange = (e) =>{
    const name = e.target && e.target.name;
    const value = e.target && e.target.value
    // console.log("values1",e.target.value)
    setCustomer({...customer,[name]:value})
    // setType
  }

  return (
    
    <Formik
      initialValues={{  customer_name: "",
        customer_email: "",
        password: "",
        booking_date: "",
        booking_type: "",
        booking_slot: "",
        booking_time: ""}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values,isSubmitting }) => (
        <Form className="form-container">
          <div className="form-group">
            <Field
              type="text"
              name="customer_name"
              placeholder="customer_name"
              className="input-field"
            />
            <ErrorMessage
              name="customer_name"
              component="div"
              className="error-message"
            />
          </div>  
         
          <div className="form-group">
            <Field
              type="email"
              name="customer_email"
              placeholder="customer_email"
              className="input-field"
            />
            <ErrorMessage
              name="customer_email"
              component="div"
              className="error-message"
            />
          </div>
          <div className="form-group">
            <Field
              type="date"
              name="booking_date"
              placeholder="Booking Date"
              className="input-field"
            />
            <ErrorMessage
              name="booking_date"
              component="div"
              className="error-message"
            />
          </div>

          <div className="form-group">
            <Field as="select" name="booking_type" className="input-field" value={customer.booking_type} onChange ={handleChange}>
              <option value="" label="Select Booking Type" />
              <option value="full_day" label="Full Day" />
              <option value="half_day" label="Half Day" />
              <option value="custom" label="Custom" />
            </Field>
            <ErrorMessage
              name="booking_type"
              component="div"
              className="error-message"
            />
          </div>

          {/* Booking Slot: Visible only for Half Day */}
          {customer.booking_type === "half_day" && (
            <div className="form-group">
              <Field as="select" name="booking_slot" className="input-field">
                <option value="" label="Select Booking Slot" />
                <option value="first_half" label="First Half" />
                <option value="second_half" label="Second Half" />
              </Field>
              <ErrorMessage
                name="booking_slot"
                component="div"
                className="error-message"
              />
            </div>
       )}

          {/* Booking Time: Visible only for Custom */}
          {customer.booking_type === "custom" && (
            <div className="form-group">
              <Field
                type="time"
                name="booking_time"
                className="input-field"
              />
              <ErrorMessage
                name="booking_time"
                component="div"
                className="error-message"
              />
            </div>
          )}
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerPage;
