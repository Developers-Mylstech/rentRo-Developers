 import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useUserStore = create((set) => ({
  userDetails: [],
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/profile');
      set({ userDetails: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch user',
        loading: false 
      });
    }
  },

  updateUser: async (updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put('/profile', updatedData);
      set({ userDetails: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update user',
        loading: false 
      });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useUserStore;