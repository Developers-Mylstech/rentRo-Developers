import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useCheckoutStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  createOrder: async (orderdata) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/checkouts', orderdata);
      set((state) => ({
        // orders: [...state.orders, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to create product',
        loading: false 
      });
      throw error;
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/checkouts');
      set({ orders: response?.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        loading: false 
      });
    }
  },

 
}));

export default useCheckoutStore;