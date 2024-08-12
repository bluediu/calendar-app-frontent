import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const calendarApi: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// Configure interceptors.
calendarApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('x-token');

  if (token) {
    config.headers.set('x-token', token);
  }

  return config;
});

export default calendarApi;
