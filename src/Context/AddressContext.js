import { create } from 'zustand';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export const useAddressStore = create((set) => ({
  addresses: [],
  loading: false,
  error: null,


  fetchAddresses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/addresses');
      set({ addresses: response.data });
    } catch (error) {
      set({ error: error.message });
      console.error("Fetch Addresses Error:", error);
    } finally {
      set({ loading: false });
    }
  },

  // CREATE
  addAddress: async (data) => {
    try {
      const response = await axiosInstance.post('/addresses', data);
      const newAddress = response.data;
      console.log('Address saved:', newAddress?.addressId);

      set((state) => ({
        addresses: [...state.addresses, newAddress],
        addressId: newAddress.addressId,
      }));
      return newAddress?.addressId;
    } catch (error) {
      console.error("Add Address Error:", error);
    }
  },

  // UPDATE
  updateAddress: async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`/addresses/${id}`, updatedData);
      set((state) => ({
        addresses: state.addresses.map((addr) =>
          addr.id === id ? response.data : addr
        ),
      }));
    } catch (error) {
      console.error("Update Address Error:", error);
    }
  },

  // DELETE
  deleteAddress: async (id) => {
    try {
      await axiosInstance.delete(`/addresses/${id}`);
      set((state) => ({
        addresses: state.addresses.filter((addr) => addr.id !== id),
        addressId: state.addressId === id ? null : state.addressId, // clear ID if deleted
      }));
    } catch (error) {
      console.error("Delete Address Error:", error);
    }
  },

  // SET SELECTED ADDRESS ID
  setAddressId: (id) => set({ addressId: id }),
}));

export default useAddressStore;