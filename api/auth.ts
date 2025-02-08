import api from './axiosInstance';

import { getRefreshToken, removeTokens, storeRefreshToken } from '~/lib/secureStore';
import { User } from '~/types/user';

export const login = async (email: string, password: string) => {
  return await api.post('/login', { email, password });
};

export const logout = async () => {
  await removeTokens();
};

export const signUp = async (fullName: string, email: string, password: string) => {
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
};

export const verifyOtp = async (email: string, otpCode: string) => {
  return await api.post('/verify-account', {
    email,
    code: otpCode,
  });
};

export const resendVerificationCode = async (email: string) => {
  await api.post('/resend-verification-code', { email });
};

export const requestResetPassword = (email: string) => {
  return api.post('/request-reset-password', { email });
};

export const resetPassword = (resetToken: string, newPassword: string) => {
  return api.post('/reset-password', {
    resetToken,
    newPassword,
  });
};

export const firstTimeSetup = (email: string, location: string) => {
  return api.post('/user/first-time-setup', {
    email,
    location,
  });
};
