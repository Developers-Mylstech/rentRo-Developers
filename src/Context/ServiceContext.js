import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useServiceStore = create((set) => ({
  services: [],
  loading: false,
  error: null,
  currentService: null,

 

  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://proud-expression-production-6ebc.up.railway.app/api/v1/our-services' )

      set({ services: response?.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        loading: false 
      });
    }
  },

  getProductById: async (id) => {
    set({ loading: true, error: null, currentService: null });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ currentService: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch product',
        loading: false 
      });
      throw error;
    }
  },

 

  // Reset Current Product
  resetCurrentProduct: () => set({ currentService: null })
}));

export default useServiceStore;