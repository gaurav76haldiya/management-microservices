import * as Yup from 'yup';

// Validation schema for personal information form
export const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  zipcode: Yup.string().required('Zipcode is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone number is required'),
});

