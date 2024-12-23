import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? ''
    : '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV === 'production') {
      config.url = `/auth${config.url}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api; 