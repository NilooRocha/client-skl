import { router } from 'expo-router';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { login as apiLogin, logout as apiLogout, signUp as apiSignUp } from '~/api/auth';
import { getRefreshToken, storeRefreshToken } from '~/lib/secureStore';
import { User } from '~/types/user';

interface AuthContextType {
  isAuthenticated: boolean;
  userLogged: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signUp: (fullName: string, email: string, password: string) => Promise<Response>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userLogged: null,
  login: async () => null,
  signUp: async () => new Response(),
  logout: async () => {},
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
      const user = await apiLogin(email, password);
      if (user) {
        setIsAuthenticated(true);
        setUserLogged(user);
        return user;
      }
      return null;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    await apiLogout();
    setIsAuthenticated(false);
    router.push('/(auth)/login');
  };

  const signUp = async (fullName: string, email: string, password: string) => {
    try {
      const response = await apiSignUp(fullName, email, password);
      setIsAuthenticated(true);
      if (response.status === 409) {
        return response as unknown as Response;
      }
      return response as unknown as Response;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userLogged, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
