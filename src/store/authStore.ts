import { create } from 'zustand';
import axios from 'axios';
import { AuthState } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useAuthStore = create<AuthState>()((set) => {
  // Initialize state from localStorage
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return {
    user,
    token,
    isAuthenticated: !!token,

    login: async (email: string, password: string) => {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    loginWithGoogle: async (accessToken: string) => {
      try {
        const response = await axios.post(`${API_URL}/auth/google`, {
          access_token: accessToken,
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      } catch (error: any) {
        console.error('Google login failed:', error);
        if (error.response?.status === 401) {
          throw new Error('Google authentication failed. Please try again.');
        } else if (error.response?.status === 409) {
          throw new Error('An account with this email already exists.');
        } else {
          throw new Error('Failed to authenticate with Google. Please try again later.');
        }
      }
    },

    register: async (email: string, password: string) => {
      try {
        const response = await axios.post(`${API_URL}/auth/register`, {
          email,
          password,
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null, token: null, isAuthenticated: false });
    },

    updateUser: (userData: Partial<AuthState['user']>) => {
      if (!userData) return;
      const updatedUser = { ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      set({ user: updatedUser });
    },
  };
});