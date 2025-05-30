import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('https://proud-expression-production-6ebc.up.railway.app/api/v1/products', productData);
      set((state) => ({
        products: [...state.products, response.data],
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

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/products');
      set({ products: response?.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch products',
        loading: false 
      });
    }
  },

  getProductById: async (id) => {
    set({ loading: true, error: null, currentProduct: null });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ currentProduct: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch product',
        loading: false 
      });
      throw error;
    }
  },

  // Update Product
  updateProduct: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/products/${id}`, updatedData);
      set((state) => ({
        products: state.products.map(product => 
          product.id === id ? response.data : product
        ),
        currentProduct: response.data,
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update product',
        loading: false 
      });
      throw error;
    }
  },

  // Delete Product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter(product => product.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to delete product',
        loading: false 
      });
      throw error;
    }
  },

  // Reset Current Product
  resetCurrentProduct: () => set({ currentProduct: null })
}));

export default useProductStore;