import axios, { AxiosInstance } from 'axios';

const authApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default authApi;
