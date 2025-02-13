import api from './axiosInstance';

import { removeTokens } from '~/lib/secureStore';
import { ChangePasswordDTO } from '~/types/auth';
import { UpdateUserDto } from '~/types/user';

export const login = async (email: string, password: string) => {
  return await api.post(
    '/login',
    { email, password },
    {
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 401;
      },
    }
  );
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

export const firstTimeSetup = (id: string, location: string) => {
  return api.patch(`/user/first-time-setup/${id}`, {
    location,
  });
};

export const readUser = (id: string) => {
  return api.get(`/user/${id}`);
};

export const updateUser = (id: string, payload: UpdateUserDto) => {
  return api.patch(`/user/${id}`, payload);
};

export const changeUserPassword = (id: string, payload: ChangePasswordDTO) => {
  return api.patch(`/change-password/${id}`, payload);
};
