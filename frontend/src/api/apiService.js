import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api/v1', // Base URL
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
