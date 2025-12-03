import axios from 'axios';
import { API_BASE_URL } from '@env';
import { useAuthStore } from '../../store/authStore';
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
API.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export const setHeadersToken = (accessToken: any) => {
  if (accessToken) {
    API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
};
export default API;
