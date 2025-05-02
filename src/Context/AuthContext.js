import { create } from 'zustand';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: localStorage.getItem('access')|| null,
  refresh: localStorage.getItem('refreshNew') || null,

  // Initiate Login Authentication
  initiateAuth: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/initiate-auth', credentials);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to initiate authentication',
        loading: false 
      });
      throw error;
    }
  },

  // Send OTP
  sendOTP: async (contact) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/register', contact);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to send OTP',
        loading: false 
      });
      throw error;
    }
  },

  // Get Refresh Token
  getRefreshToken: async () => {
    set({ loading: true, error: null });
    try {
      const refreshToken = localStorage.getItem('refresh');
      const response = await axiosInstance.post('/auth/refresh-token', {
        refreshToken: refreshToken
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      set({ 
        token,
        loading: false 
      });
      
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to refresh token',
        loading: false 
      });
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      throw error;
    }
  },

  // Verify OTP and Login
  verifyOTP: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/complete-auth', data);
      // const {  access, refreshNew } = response.data; // Update destructuring to match API response

      const access = response.data?.accessToken;
      const refreshNew = response.data?.refreshToken;

      console.log(access,refreshNew, "tokens value ")
      
      // Save tokens in localStorage
      localStorage.setItem('access', access);
      localStorage.setItem('refreshNew', refreshNew);
      
      set({ 
        token: access, // Update token name to match
        refresh: refreshNew, // Update refresh name to match
        isAuthenticated: true,
        loading: false 
      });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to verify OTP',
        loading: false 
      });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshNew');
      const accessToken = localStorage.getItem('access');

     

      // Set the authorization header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Make the logout API call
      const response = await axiosInstance.post(`/auth/logout?refreshToken=${refreshToken}`);

      if (response.status === 200) {
      
        localStorage.removeItem('access');
        localStorage.removeItem('refreshNew');
        localStorage.removeItem('userEmail');
        // localStorage.removeItem('user');
        set({ 
          user: null,
          token: null,
          refresh: null,
          isAuthenticated: false,
          error: null 
        });
        return;
      }

    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear local state
      localStorage.removeItem('access');
      localStorage.removeItem('refreshNew');
      set({ 
        user: null,
        token: null,
        refresh: null,
        isAuthenticated: false,
        error: error.response?.data?.message || 'Logout failed' 
      });
    }
  },

  // Check auth status
  checkAuth: async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get('/auth/me');
      set({ 
        user: response.data,
        isAuthenticated: true,
        loading: false 
      });
    } catch (error) {
      localStorage.removeItem('access');
      localStorage.removeItem('refreshNew');
      set({ 
        user: null,
        token: null,
        refresh: null,
        isAuthenticated: false,
        loading: false,
        error: error.response?.data?.message || 'Authentication failed'
      });
    }
  },

  // Clear error
  clearError: () => set({ error: null })
}));

export default useAuthStore;



