// import { create } from 'zustand';
// import axiosInstance from '../utils/axiosInstance';

// const useCartStore = create((set, get) => ({
//   cartItems: [],
//   loading: false,
//   error: null,
//   totalItems: 0,
//   totalAmount: 0,

//   // Add item to cart
//   addToCart: async (item) => {
//     set({ loading: true, error: null });

//       const accessToken = localStorage.getItem('access');

//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
//     try {
//       const response = await axiosInstance.post('/carts/items', item);

      
//       // Update cart with the response
//       set(state => {
//         // Check if item already exists in cart
//         const existingItemIndex = state.cartItems.findIndex(
//           cartItem => cartItem.productId === item.id && cartItem.productType === payload.productType
//         );

//         let newCartItems;
//         if (existingItemIndex >= 0) {
//           // Update existing item
//           newCartItems = [...state.cartItems];
//           newCartItems[existingItemIndex] = {
//             ...newCartItems[existingItemIndex],
//             sellQuantity: payload.productType === "SELL" ? 
//               newCartItems[existingItemIndex].sellQuantity + payload.sellQuantity : 
//               newCartItems[existingItemIndex].sellQuantity,
//             rentPeriod: payload.productType === "RENT" ? 
//               payload.rentPeriod : 
//               newCartItems[existingItemIndex].rentPeriod
//           };
//         } else {
//           // Add new item
//           newCartItems = [...state.cartItems, {
//             ...response.data,
//             productName: item.name,
//             productImage: item.image,
//             price: item.price
//           }];
//         }

//         // Calculate totals
//         const totalItems = newCartItems.reduce((total, item) => 
//           total + (item.productType === "SELL" ? item.sellQuantity : 1), 0);
        
//         const totalAmount = newCartItems.reduce((total, item) => 
//           total + (item.price * (item.productType === "SELL" ? item.sellQuantity : 1)), 0);

//         return {
//           cartItems: newCartItems,
//           totalItems,
//           totalAmount,
//           loading: false
//         };
//       });

//       return response.data;
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Failed to add item to cart',
//         loading: false 
//       });
//       throw error;
//     }
//   },

//   // Remove item from cart
//   removeFromCart: async (itemId) => {
//     set({ loading: true, error: null });
    
//     try {
//       await axiosInstance.delete(`/cart-items/${itemId}`);
      
//       set(state => {
//         const newCartItems = state.cartItems.filter(item => item.id !== itemId);
        
//         // Recalculate totals
//         const totalItems = newCartItems.reduce((total, item) => 
//           total + (item.productType === "SELL" ? item.sellQuantity : 1), 0);
        
//         const totalAmount = newCartItems.reduce((total, item) => 
//           total + (item.price * (item.productType === "SELL" ? item.sellQuantity : 1)), 0);

//         return {
//           cartItems: newCartItems,
//           totalItems,
//           totalAmount,
//           loading: false
//         };
//       });
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Failed to remove item from cart',
//         loading: false 
//       });
//       throw error;
//     }
//   },

//   // Update item quantity
//   updateCartItemQuantity: async (itemId, quantity) => {
//     set({ loading: true, error: null });
    
//     try {
//       const cartItem = get().cartItems.find(item => item.id === itemId);
      
//       if (!cartItem) {
//         throw new Error('Item not found in cart');
//       }
      
//       const payload = {
//         productId: cartItem.productId,
//         productType: cartItem.productType,
//         rentPeriod: cartItem.rentPeriod,
//         sellQuantity: quantity,
//         valid: true
//       };

    
      
//       const response = await axiosInstance.put(`/cart-items/${itemId}`, payload);
      
//       set(state => {
//         const newCartItems = state.cartItems.map(item => 
//           item.id === itemId ? { ...item, sellQuantity: quantity } : item
//         );
        
//         // Recalculate totals
//         const totalItems = newCartItems.reduce((total, item) => 
//           total + (item.productType === "SELL" ? item.sellQuantity : 1), 0);
        
//         const totalAmount = newCartItems.reduce((total, item) => 
//           total + (item.price * (item.productType === "SELL" ? item.sellQuantity : 1)), 0);

//         return {
//           cartItems: newCartItems,
//           totalItems,
//           totalAmount,
//           loading: false
//         };
//       });
      
//       return response.data;
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Failed to update cart item',
//         loading: false 
//       });
//       throw error;
//     }
//   },

//   // Fetch cart items
//   fetchCartItems: async () => {
//     set({ loading: true, error: null });

//     const accessToken = localStorage.getItem('access');

//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
//     try {
//       const response = await axiosInstance.get('/carts');
      
//       // Assuming the API returns cart items with product details
//       const cartItemsFetched = response.data;
//       console.log(cartItemsFetched, "cart items from context")
      
//       // Calculate totals
//       // const totalItems = cartItems.reduce((total, item) => 
//       //   total + (item.productType === "SELL" ? item.sellQuantity : 1), 0);
      
//       // const totalAmount = cartItems.reduce((total, item) => 
//       //   total + (item.price * (item.productType === "SELL" ? item.sellQuantity : 1)), 0);
      
//       set({ 
//         cartItems:cartItemsFetched,
//         totalItems:cartItemsFetched?.items?.length,
//         totalAmount:cartItemsFetched?.totalPrice,
//         loading: false 
//       });
      
//       // return cartItems;
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Failed to fetch cart items',
//         loading: false 
//       });
//       throw error;
//     }
//   },

//   // Clear cart
//   clearCart: async () => {
//     set({ loading: true, error: null });
    
    
//     try {
//       await axiosInstance.delete('/cart-items');
      
//       set({ 
//         cartItems: [],
//         totalItems: 0,
//         totalAmount: 0,
//         loading: false 
//       });
//     } catch (error) {
//       set({ 
//         error: error.response?.data?.message || 'Failed to clear cart',
//         loading: false 
//       });
//       throw error;
//     }
//   }
// }));

// export default useCartStore;




import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';

const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,
  error: null,
  totalItems: 0,
  totalAmount: 0,


  addToCart: async (item) => {
    set({ loading: true, error: null });
    const accessToken = localStorage.getItem('access');
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    try {
      const response = await axiosInstance.post('/carts/items', item);
      
      // Update cart with the response
      set(state => {
        // Check if item already exists in cart
        const existingItemIndex = state.cartItems.findIndex(
          cartItem => cartItem.productId === item.productId && cartItem.productType === item.productType
        );

        let newCartItems;
        if (existingItemIndex >= 0) {
          // Update existing item
          newCartItems = [...state.cartItems];
          newCartItems[existingItemIndex] = {
            ...newCartItems[existingItemIndex],
            sellQuantity: item.productType === "SELL" ? 
              newCartItems[existingItemIndex].sellQuantity + item.sellQuantity : 
              newCartItems[existingItemIndex].sellQuantity,
            rentPeriod: item.productType === "RENT" ? 
              item.rentPeriod : 
              newCartItems[existingItemIndex].rentPeriod
          };
        } else {
          // Add new item
          newCartItems = [...state.cartItems, {
            ...response.data,
            productName: item.name,
            productImage: item.image,
            price: item.price
          }];
        }

        // Calculate totals
        const totalItems = newCartItems.reduce((total, item) => 
          total + (item.productType === "SELL" ? item.sellQuantity : 1), 0);
        
        const totalAmount = newCartItems.reduce((total, item) => 
          total + (item.price * (item.productType === "SELL" ? item.sellQuantity : 1)), 0);

        return {
          cartItems: newCartItems,
          totalItems,
          totalAmount,
          loading: false
        };
      });

      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to add item to cart',
        loading: false 
      });
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    set({ loading: true, error: null });
    
    try {
      await axiosInstance.delete(`/carts/items/${itemId}`);
      
      set(state => {
        const newCartItems = state.cartItems.filter(item => item.id !== itemId);
        
        // Recalculate totals
        const totalItems = newCartItems.reduce((total, item) => 
          total + (item.productType === "SELL" ? item.sellQuantity : 1), 0);
        
        const totalAmount = newCartItems.reduce((total, item) => 
          total + (item.price * (item.productType === "SELL" ? item.sellQuantity : 1)), 0);

        return {
          cartItems: newCartItems,
          totalItems,
          totalAmount,
          loading: false
        };
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to remove item from cart',
        loading: false 
      });
      throw error;
    }
  },

  // Update item quantity
  updateCartItemQuantity: async (itemId, quantity) => {
    set({ loading: true, error: null });
    const accessToken = localStorage.getItem('access');
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // Fix: Access the items array inside cartItems object
      const cartItemsArray = get().cartItems?.items || [];
      const cartItem = cartItemsArray.find(item => item.cartItemId === itemId);
      
      if (!cartItem) {
        throw new Error('Item not found in cart');
      }
      
      // Ensure quantity is always a valid number (minimum 1)
      const validQuantity = Math.max(1, quantity || 1);
      
      let payload = {}

      if (cartItem.productType === "SELL") {
       payload = {
          productId: cartItem.productId,
          productType: cartItem.productType,
         
          quantity: validQuantity,
    
        };
      } else {
        payload = {
          productId: cartItem.productId,
          productType: cartItem.productType,
          rentPeriod: cartItem.productDetail?.rentPeriod ,
          quantity: validQuantity,
    
        };
      }
      
      const response = await axiosInstance.put(`/cart-items/${itemId}`, payload);
      
      // After successful update, fetch the cart again to get updated data
      await get().fetchCartItems();
      
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to update cart item',
        loading: false 
      });
      throw error;
    }
  },

  // Fetch cart items
  fetchCartItems: async () => {
    set({ loading: true, error: null });

    const accessToken = localStorage.getItem('access');
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    try {
      const response = await axiosInstance.get('/carts');
      
      // Assuming the API returns cart items with product details
      const cartItemsFetched = response.data;
      console.log(cartItemsFetched, "cart items from context");
      
      set({ 
        cartItems: cartItemsFetched,
        totalItems: cartItemsFetched?.items?.length || 0,
        totalAmount: cartItemsFetched?.totalPrice || 0,
        loading: false 
      });
      
      return cartItemsFetched; // Return the fetched data instead of undefined cartItems
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch cart items',
        loading: false 
      });
      throw error;
    }
  },

  // Clear cart
  clearCart: async () => {
    set({ loading: true, error: null });
    
    try {
      await axiosInstance.delete('/cart-items');
      
      set({ 
        cartItems: [],
        totalItems: 0,
        totalAmount: 0,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to clear cart',
        loading: false 
      });
      throw error;
    }
  }
}));

export default useCartStore;


