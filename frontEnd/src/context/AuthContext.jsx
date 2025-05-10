import axiosClient from '@/api/axiosClient';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const login = (userData, tokenData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
    setUser(userData);
    setToken(tokenData);
  };

  const logout = async () => {
  try {
    // Call API to handle logout on the backend (optional but recommended)
    await axiosClient.post('/logout');

    // Clear localStorage and context
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
