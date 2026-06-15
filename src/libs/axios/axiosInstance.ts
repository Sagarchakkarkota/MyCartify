import axios from 'axios';
import { useAuthStore } from '../../store/authStore';
import { initializeApiSslPinning } from '../../services/sslPinning';
import { API_URL } from '@/config/api';

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use(
  async config => {
    await initializeApiSslPinning();

    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  error => Promise.reject(error),
);

export const setHeadersToken = (accessToken: any) => {
  if (accessToken) {
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete API.defaults.headers.common.Authorization;
  }
};
export default API;
