// wishlistStore.js
import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useWishlistStore = create((set, get) => ({
  wishlist: [],

  // Fetch wishlist from backend
  fetchWishlist: async () => {
    try {
      const response = await axiosInstance.get('/wishlist');
      set({ wishlist: response.data.products });
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  },

  // Add a single item
  addToWishlist: async (id) => {
    try {
      await axiosInstance.post(`/wishlist/products/${id}`, );
      set((state) => ({
        wishlist: [...state.wishlist, item],
      }));
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  },

  // Remove an item
  removeFromWishlist: async (itemId) => {
    try {
      await axiosInstance.delete(`/wishlist/products/${itemId}`);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== itemId),
      }));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  },

  // Add multiple items
  addBatchToWishlist: async (items) => {
    try {
      await axiosInstance.post('/wishlist/products/batch', items);
      const uniqueItems = items.filter(
        (newItem) =>
          !get().wishlist.some((existing) => existing.id === newItem.id)
      );
      set((state) => ({
        wishlist: [...state.wishlist, ...uniqueItems],
      }));
    } catch (error) {
      console.error('Failed to add batch to wishlist:', error);
    }
  },
}));

export default useWishlistStore;
