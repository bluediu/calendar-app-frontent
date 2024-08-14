import axios, { AxiosInstance } from 'axios';

export const authApi: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});
