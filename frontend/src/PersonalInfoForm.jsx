import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { submitPersonalInfo } from '../api/chatbotApi';

const PersonalInfoForm = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      zipcode: '',
      address: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      zipcode: Yup.string().required('Zipcode is required'),
      address: Yup.string().required('Address is required'),
      phone: Yup.string().required('Phone number is required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await submitPersonalInfo(values);
        alert('Submission successful');
        onSuccess();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>
      <div>
        <label>Email:</label>
        <input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div>
        <label>Zipcode:</label>
        <input
          name="zipcode"
          onChange={formik.handleChange}
          value={formik.values.zipcode}
        />
        {formik.errors.zipcode ? <div>{formik.errors.zipcode}</div> : null}
      </div>
      <div>
        <label>Address:</label>
        <input
          name="address"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.errors.address ? <div>{formik.errors.address}</div> : null}
      </div>
      <div>
        <label>Phone:</label>
        <input
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalInfoForm;

