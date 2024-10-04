import axios from 'axios';

// Axios instance with default settings
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API methods
export const fetchQuestion = (step) => api.get(`/question?step=${step}`);
export const submitResponse = (response) => api.post('/response', response);
export const submitPersonalInfo = (personalInfo) => api.post('/personal_info', personalInfo);

