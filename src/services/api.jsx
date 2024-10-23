// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com', // Replace with your API base URL
});

// Request interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token; // Attach the token to the headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
