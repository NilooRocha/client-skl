import axios from 'axios';

import { getRefreshToken, storeRefreshToken } from '~/lib/secureStore';

const api = axios.create({
  baseURL: 'http://192.168.1.58:8080',
});

api.interceptors.request.use(
  async (config) => {
    console.log("I'm here - Request started:", config.url);
    const token = await getRefreshToken();
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("I'm here - Response received:", response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        const response = await api.post('/refresh-token', { refreshToken });

        const newRefreshToken = response.headers['refresh-token'];

        if (newRefreshToken) {
          await storeRefreshToken(newRefreshToken);
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
