import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance'; 
const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/orders'); // replace with your actual endpoint
      set({ orders: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch orders', 
        loading: false 
      });
    }
  },
}));

export default useOrderStore;
