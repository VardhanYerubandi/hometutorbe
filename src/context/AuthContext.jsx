// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const res = await fetch(`${API_BASE}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let msg = await res.text();
        try {
          const j = JSON.parse(msg);
          msg = j.message || j.error || JSON.stringify(j);
        } catch (e) {
          /* keep text msg */
        }
        throw new Error(msg || `Login failed (${res.status})`);
      }

      const data = await res.json();
      // Expecting { token: '...', user: { id, name, email, role } }
      const token = data.token || data.accessToken || null;
      const userData = data.user || data;
      if (!token) {
        // It's possible the backend returns only user info; still save if available
        console.warn('Login response did not include a token. Check backend response shape.');
      }

      localStorage.setItem(TOKEN_KEY, token || '');
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email, password, userData) => {
    setLoading(true);
    setError(null);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName: userData.name,
          role: userData.role,
          phone: userData.phone || '',
          location: userData.location || ''
        }),
      });

      if (!res.ok) {
        let msg = await res.text();
        try {
          const j = JSON.parse(msg);
          msg = j.message || j.error || JSON.stringify(j);
        } catch (e) {
          /* keep text msg */
        }
        throw new Error(msg || `Registration failed (${res.status})`);
      }

      const data = await res.json();
      const token = data.token || data.accessToken || null;
      const newUser = data.user || data;

      localStorage.setItem(TOKEN_KEY, token || '');
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};