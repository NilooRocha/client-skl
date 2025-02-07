import axios from 'axios';
import { router } from 'expo-router';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://192.168.1.58:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config.url !== '/login') {
      const refreshToken = Cookies.get('RefreshToken');

      if (!refreshToken) {
        router.replace('/(auth)/login');
        return Promise.reject('Refresh token expired');
      }

      try {
        await handleTokenRefresh();
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        Cookies.remove('RefreshToken');
        router.replace('/(auth)/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const handleTokenRefresh = async () => {
  const response = await axiosInstance.post('/refresh-token');
  const newToken = response.headers['authorization'];
  if (newToken) {
    Cookies.set('Authorization', newToken);
  } else {
    throw new Error('Failed to refresh token');
  }
};

export default axiosInstance;
