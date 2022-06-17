import axios, { AxiosInstance } from 'axios';

const calendarApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

// config interceptors
calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')!,
  };

  return config;
});

export default calendarApi;
