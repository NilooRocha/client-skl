import api from './axiosInstance';

import { getRefreshToken, removeTokens, storeRefreshToken } from '~/lib/secureStore';
import { User } from '~/types/user';

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await api.post('/login', { email, password });

    const refreshToken = response.headers['refresh-token'];

    if (refreshToken) {
      console.log(refreshToken);
      await storeRefreshToken(refreshToken);
      console.log(getRefreshToken());
    }

    return response.data as User;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Invalid credentials');
  }
};

export const logout = async () => {
  try {
    await removeTokens();
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout');
  }
};

export const signUp = async (fullName: string, email: string, password: string) => {
  try {
    return await api.post(
      '/user',
      {
        fullName,
        email,
        password,
      },
      {
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 409;
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error('Signup failed.');
  }
};

export const verifyOtp = async (email: string, otpCode: string) => {
  try {
    return await api.post('/verify-account', {
      email,
      code: otpCode,
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    throw new Error('OTP verification failed.');
  }
};
