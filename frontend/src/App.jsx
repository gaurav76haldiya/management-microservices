import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const App = () => {
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState('');
  const [userResponses, setUserResponses] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch the first question
  useEffect(() => {
    fetchQuestion(step);
  }, [step]);

  const fetchQuestion = async (currentStep) => {
    try {
      const response = await axios.get(`/question?step=${currentStep}`);
      setQuestion(response.data.question);
    } catch (error) {
      if (error.response.status === 404) {
        setShowForm(true);  // No more questions, show personal info form
      }
    }
  };

  const handleResponse = async (answer) => {
    const newResponse = { question, answer };
    setUserResponses([...userResponses, newResponse]);
    setStep(step + 1);
  };

  // Formik validation schemaimport React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import PersonalInfoForm from './components/PersonalInfoForm';
import SubmissionDialog from './components/SubmissionDialog';

const App = () => {
  const [isChatFinished, setIsChatFinished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState(null);

  const handleChatFinish = () => setIsChatFinished(true);
  const handleFormSuccess = (info) => {
    setSubmittedInfo(info);
    setIsSubmitted(true);
  };

  return (
    <div>
      {!isChatFinished ? (
        <Chatbot onFinish={handleChatFinish} />
      ) : !isSubmitted ? (
        <PersonalInfoForm onSuccess={handleFormSuccess} />
      ) : (
        <SubmissionDialog info={submittedInfo} onClose={() => setIsSubmitted(false)} />
      )}
    </div>
  );
};

export default App;

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
      // Submit personal information
      const response = await axios.post('/personal_info', values);
      alert('Submission successful: ' + JSON.stringify(response.data.details));
    }
  });

  return (
    <div>
      {!showForm ? (
        <div>
          <h1>Chatbot</h1>
          <p>{question}</p>
          <button onClick={() => handleResponse('Yes')}>Yes</button>
          <button onClick={() => handleResponse('No')}>No</button>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <h2>Submit your information</h2>
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
      )}
    </div>
  );
};

export default App;

