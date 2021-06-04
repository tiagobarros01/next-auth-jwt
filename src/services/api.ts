import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'NextJWT@token': token } = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:333',
});

api.interceptors.request.use((config) => {
  console.log(config);

  return config;
});

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}
