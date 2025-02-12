import { router } from 'expo-router';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

import {
  login as apiLogin,
  logout as apiLogout,
  signUp as apiSignUp,
  readUser as apiGetUser,
} from '~/api/auth';
import { getRefreshToken, storeRefreshToken } from '~/lib/secureStore';
import { User } from '~/types/user';

interface AuthContextType {
  isAuthenticated: boolean;
  userLogged: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signUp: (fullName: string, email: string, password: string) => Promise<Response>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userLogged: null,
  login: async () => null,
  signUp: async () => new Response(),
  logout: async () => {},
  reloadUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLogged, setUserLogged] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getRefreshToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/(auth)');
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await apiLogin(email, password);
      const refreshToken = response.headers['refresh-token'];

      if (refreshToken) {
        console.log(refreshToken);
        await storeRefreshToken(refreshToken);
        console.log(getRefreshToken());
      }

      setIsAuthenticated(true);
      const user: User = response.data as User;
      setUserLogged(user);
      return user;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    await apiLogout();
    setIsAuthenticated(false);
  };

  const signUp = async (fullName: string, email: string, password: string) => {
    try {
      const response = await apiSignUp(fullName, email, password);
      if (response.status === 409) {
        return response as unknown as Response;
      }
      return response as unknown as Response;
    } catch (error) {
      throw error;
    }
  };

  const reloadUser = async () => {
    if (!userLogged) return;

    try {
      const response = await apiGetUser(userLogged.id);
      setUserLogged(response.data as User);
    } catch (error) {
      console.log('Failed to reload user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userLogged, login, logout, signUp, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
};
