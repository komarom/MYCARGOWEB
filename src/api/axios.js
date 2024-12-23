import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://mycargoweb.vercel.app'
    : '/auth',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://mycargoweb.vercel.app'
  }
});

export default api; 