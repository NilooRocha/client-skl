import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { useToast } from './ToastContext';

import { handleError } from '~/lib/utils';
import { AuthContextType } from '~/types/auth';
import { User } from '~/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  const { showToast } = useToast();

  useEffect(() => {
    const token = Cookies.get('Authorization');
    setIsAuthenticated(!!token);
  }, []);

  // useEffect(() => {
  //     const fetchUserData = async () => {
  //         if (!user?.id) return;

  //         try {
  //             const response = await fetch(`http://192.168.1.58:8080/user/${user.id}`, {
  //                 method: "GET",
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //                 credentials: "include",
  //             });

  //             if (!response.ok) {
  //                 return null;
  //             }

  //             const userData = await response.json();

  //             if (!userData) {
  //                 return null;

  //             }

  //             setUser(userData);
  //             setIsAuthenticated(true);
  //         } catch (error) {
  //             console.error("Error fetching user data:", error);
  //             handleError(error, showToast)
  //             return null;
  //         }
  //     };

  //     fetchUserData();
  // }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://192.168.1.58:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.status === 401) {
        // console.error("Login request failed with status:", response.status);
        showToast('Invalid credentials', 'error');
        return null;
      }

      const userData = await response.json();

      if (!userData) {
        showToast('Unable to process login. Try again later.', 'error');
        return null;
      }

      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      console.error('Unexpected error during login:', error);
      handleError(error, showToast);
      return null;
    }
  };

  const logout = async () => {
    const response = await fetch('http://192.168.1.58:8080/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to logout.');
    }
    Cookies.remove('Authorization');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
