// import React, { useEffect, useState } from "react";
// import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import useCartStore from "../../Context/CartContext";
// import useAuthStore from "../../Context/AuthContext";
// import useProductStore from "../../Context/ProductContext";
// const CartSidebar = ({ isOpen, onClose }) => {
//   const { 
//     cartItems, 
//     totalItems, 
//     totalAmount, 
//     removeFromCart,
//     updateCartItemQuantity,
//     fetchCartItems,
//     addMutipleProducts
//   } = useCartStore();

//   const { token } = useAuthStore();
//   const { getProductById, products, fetchSellProducts } = useProductStore();

//   const [localCartItems, setLocalCartItems] = useState([]);
//   const [localTotalAmount, setLocalTotalAmount] = useState(0);

//   // Load local cart items when component mounts or when isOpen changes
//   useEffect(() => {
//     if (!token && isOpen) {
//       const storedItems = localStorage.getItem('cartItemsOffline');
//       if (storedItems) {
//         try {
//           const parsedItems = JSON.parse(storedItems);
//           setLocalCartItems(parsedItems);
          
//           // Fetch product details if needed
//           // if (parsedItems.length > 0 && products.length === 0) {
//           //   fetchSellProducts();
//           // }
//         } catch (error) {
//           console.error("Error parsing local cart items:", error);
//           setLocalCartItems([]);
//         }
//       } else {
//         setLocalCartItems([]);
//       }
//     }
//   }, [isOpen, token, products.length, fetchSellProducts]);

//   // Calculate local total amount whenever products or localCartItems change
//   useEffect(() => {
//     if (!token && localCartItems.length > 0) {
//       let total = 0;
      
//       localCartItems.forEach(item => {
//         const productDetails = getProductDetails(item.productId);
//         const price = item.productType === "SELL" 
//           ? productDetails?.productFor?.sell?.discountPrice || 0
//           : productDetails?.productFor?.rent?.discountPrice || 0;
        
//         total += price * (item.quantity || 1);
//       });
      
//       setLocalTotalAmount(total);
//     }
//   }, [token, localCartItems, products]);



//   // Fetch cart items from API when logged in
//   useEffect(() => {
//     const storedItems = localStorage.getItem('cartItemsOffline');
//       if (storedItems) {
//         try {
//           const parsedItems = JSON.parse(storedItems);
//           setLocalCartItems(parsedItems);
//           // localStorage.removeItem('cartItemsOffline');
//         } catch (error) {
//           console.error("Error parsing local cart items:", error);
//           setLocalCartItems([]);
//         }
//       }
//     if (isOpen && token) {
//       if(localCartItems.length > 0){
//         addMutipleProducts(localCartItems);
//         localStorage.removeItem('cartItemsOffline');
//       }
//       fetchCartItems();
//     }
//   }, [isOpen, token, fetchCartItems]);

//   // Handle quantity change for authenticated users
//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
//     updateCartItemQuantity(itemId, newQuantity);
//   };
  
//   // Handle quantity change for local cart
//   const handleLocalQuantityChange = (itemIndex, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     const updatedItems = [...localCartItems];
//     updatedItems[itemIndex] = {
//       ...updatedItems[itemIndex],
//       quantity: newQuantity
//     };
    
//     setLocalCartItems(updatedItems);
//     localStorage.setItem('cartItemsOffline', JSON.stringify(updatedItems));
//   };

//   // Handle remove from cart for authenticated users
//   const handleRemoveFromCart = (itemId) => {
//     removeFromCart(itemId);
//     setTimeout(() => {
//       fetchCartItems();
//     }, 1000);
//   };
  
//   // Handle remove from local cart
//   const handleLocalRemoveFromCart = (itemIndex) => {
//     const updatedItems = localCartItems.filter((_, index) => index !== itemIndex);
//     setLocalCartItems(updatedItems);
//     localStorage.setItem('cartItemsOffline', JSON.stringify(updatedItems));
//   };

//   // Find product details from products array
//   const getProductDetails = (productId) => {
//     return products.find(product => product.productId === productId) || {};
//   };


//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 duration-300"
//           onClick={onClose}
//         />
//       )}
      
//       {/* Cart Sidebar */}
//       <div 
//         className={`fixed top-0 right-0 h-full w-full md:w-[30vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } flex flex-col`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-100">
//           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <span>Your Cart</span>
//             <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//               {token ? (cartItems?.items?.length || 0) : localCartItems.length}
//             </span>
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>
        
//         {/* Cart Items */}
//         <div className="flex-grow overflow-y-auto p-4">
//           {/* For authenticated users */}
//           {token ? (
//             cartItems?.items?.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center p-6">
//                 <div className="text-gray-300 mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
//                 <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
//                 <Link 
//                   to="/sale" 
//                   onClick={onClose}
//                   className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                 >
//                   Start Shopping
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cartItems?.items?.map((item) => (
//                   <div key={item?.cartItemId} className="flex border border-gray-100 rounded-lg p-3 relative hover:shadow-sm transition-shadow">
//                     <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
//                       <img 
//                         src={item?.productImages[0]} 
//                         alt={item?.productName} 
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
                    
//                     <div className="ml-3 flex-grow">
//                       <h3 className="font-medium text-gray-800 line-clamp-1">{item.productName}</h3>
//                       <p className="text-xs text-gray-500 mb-1">
//                         {item.productType === "RENT" ? 
//                           `Rent (${item?.productDetail?.rentPeriod} months)` : 
//                           "For Sale"}
//                       </p>
                      
//                       <div className="flex justify-between items-center mt-2">
//                         <div className="text-blue-600 font-semibold">
//                           AED {item.price.toFixed(2)}
//                           {item.productType === "SELL" && item?.productDetail?.sell?.discountPrice < item?.productDetail?.sell?.actualPrice && (
//                             <span className="ml-2 text-xs text-gray-400 line-through">
//                               AED {item?.productDetail?.sell?.actualPrice.toFixed(2)}
//                             </span>
//                           )}
//                         </div>
                        
//                         <div className="flex items-center border rounded-md">
//                           <button 
//                             onClick={() => handleQuantityChange(item.cartItemId, item?.productDetail?.quantity - 1)}
//                             className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
//                           >
//                             <FaMinus size={12} />
//                           </button>
//                           <span className="px-2 text-sm w-6 text-center">
//                             {item.productDetail.quantity}
//                           </span>
//                           <button 
//                             onClick={() => handleQuantityChange(item.cartItemId, item?.productDetail?.quantity + 1)}
//                             className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
//                           >
//                             <FaPlus size={12} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <button 
//                       onClick={() => handleRemoveFromCart(item.cartItemId)}
//                       className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )
//           ) : (
//             /* For unauthenticated users - local storage cart */
//             localCartItems.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center p-6">
//                 <div className="text-gray-300 mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
//                 <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
//                 <Link 
//                   to="/sale" 
//                   onClick={onClose}
//                   className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                 >
//                   Start Shopping
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {localCartItems.map((item, index) => {
//                   const productDetails = getProductDetails(item.productId);
//                   // Calculate the item price based on product type
//                   const itemPrice = item.productType === "SELL" 
//                     ? (productDetails?.productFor?.sell?.discountPrice || 0)
//                     : (productDetails?.productFor?.rent?.discountPrice || 0);
                  
//                   // Calculate the total price for this item
//                   const totalItemPrice = itemPrice * (item.quantity || 1);
                  
//                   return (
//                     <div key={index} className="flex border border-gray-100 rounded-lg p-3 relative hover:shadow-sm transition-shadow">
//                       <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
//                         <img 
//                           src={productDetails?.imageUrls?.[0] || 'https://via.placeholder.com/100'} 
//                           alt={productDetails?.name || 'Product'} 
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
                      
//                       <div className="ml-3 flex-grow">
//                         <h3 className="font-medium text-gray-800">{productDetails?.name || 'Product'}</h3>
//                         <p className="text-xs text-gray-500 mb-1">
//                           {item.productType === "RENT" ? 
//                             `Rent (${item.rentPeriod || 1} months)` : 
//                             "For Sale"}
//                         </p>
                        
//                         <div className="flex justify-between items-center mt-2">
//                           <div className="text-blue-600 font-semibold">
//                             AED {totalItemPrice.toFixed(2)}
//                             {item.productType === "SELL" && 
//                              productDetails?.productFor?.sell?.actualPrice > 
//                              productDetails?.productFor?.sell?.discountPrice && (
//                               <span className="ml-2 text-xs text-gray-400 line-through">
//                                 AED {(productDetails?.productFor?.sell?.actualPrice * (item.quantity || 1)).toFixed(2)}
//                               </span>
//                             )}
//                           </div>
                          
//                           <div className="flex items-center border rounded-md">
//                             <button 
//                               onClick={() => handleLocalQuantityChange(index, (item.quantity || 1) - 1)}
//                               className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
//                             >
//                               <FaMinus size={12} />
//                             </button>
//                             <span className="px-2 text-sm w-6 text-center">
//                               {item.quantity || 1}
//                             </span>
//                             <button 
//                               onClick={() => handleLocalQuantityChange(index, (item.quantity || 1) + 1)}
//                               className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
//                             >
//                               <FaPlus size={12} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <button 
//                         onClick={() => handleLocalRemoveFromCart(index)}
//                         className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
//                       >
//                         <FaTrash size={14} />
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             )
//           )}
//         </div>
        
//         {/* Cart Footer - Order Summary */}
//         {(token ? cartItems?.items?.length > 0 : localCartItems.length > 0) && (
//           <div className="border-t border-gray-100 p-4 bg-gray-50">
//             <div className="flex justify-between mb-3">
//               <span className="text-gray-600">Subtotal</span>
//               <span className="font-semibold">
//                 AED {token ? totalAmount.toFixed(2) : localTotalAmount.toFixed(2)}
//               </span>
//             </div>
//             <div className="border-t border-gray-200 pt-3 mb-4">
//               <div className="flex justify-between font-medium text-lg">
//                 <span>Total</span>
//                 <span className="text-blue-600">
//                   AED {token ? totalAmount.toFixed(2) : localTotalAmount.toFixed(2)}
//                 </span>
//               </div>
//             </div>
            
//             {token ? (
//               <Link 
//                 to="/waterfilterSubscription"
//                 onClick={onClose}
//                 className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
//               >
//                 Proceed to Checkout
//               </Link>
//             ) : (
//               <Link 
//                 to="/login"
//                 onClick={onClose}
//                 className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
//               >
//                 Login to Checkout
//               </Link>
//             )}
//             <button 
//               onClick={onClose}
//               className="block w-full py-2.5 mt-2 text-gray-600 hover:text-gray-800 text-center text-sm"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartSidebar;


import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaMinus, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCartStore from "../../Context/CartContext";
import useAuthStore from "../../Context/AuthContext";
import useProductStore from "../../Context/ProductContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    totalItems, 
    totalAmount, 
    removeFromCart,
    updateCartItemQuantity,
    fetchCartItems,
    addMutipleProducts
  } = useCartStore();

  const { token } = useAuthStore();
  const { getProductById, products, fetchSellProducts } = useProductStore();

  const [localCartItems, setLocalCartItems] = useState([]);
  const [localTotalAmount, setLocalTotalAmount] = useState(0);

  // Load local cart items when component mounts or when isOpen changes
  useEffect(() => {
    if (!token && isOpen) {
      const storedItems = localStorage.getItem('cartItemsOffline');
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          setLocalCartItems(parsedItems);
        } catch (error) {
          console.error("Error parsing local cart items:", error);
          setLocalCartItems([]);
        }
      } else {
        setLocalCartItems([]);
      }
    }
  }, [isOpen, token, products.length, fetchSellProducts]);

  // Calculate local total amount whenever products or localCartItems change
  useEffect(() => {
    if (!token && localCartItems.length > 0) {
      let total = 0;
      
      localCartItems.forEach(item => {
        const productDetails = getProductDetails(item.productId);
        const price = item.productType === "SELL" 
          ? productDetails?.productFor?.sell?.discountPrice || 0
          : productDetails?.productFor?.rent?.discountPrice || 0;
        
        total += price * (item.quantity || 1);
      });
      
      setLocalTotalAmount(total);
    }
  }, [token, localCartItems, products]);

  // Fetch cart items from API when logged in
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItemsOffline');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setLocalCartItems(parsedItems);
      } catch (error) {
        console.error("Error parsing local cart items:", error);
        setLocalCartItems([]);
      }
    }
    if (isOpen && token) {
      if(localCartItems.length > 0){
        addMutipleProducts(localCartItems);
        localStorage.removeItem('cartItemsOffline');
      }
      fetchCartItems();
    }
  }, [isOpen, token, fetchCartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
  };
  
  const handleLocalQuantityChange = (itemIndex, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = [...localCartItems];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      quantity: newQuantity
    };
    
    setLocalCartItems(updatedItems);
    localStorage.setItem('cartItemsOffline', JSON.stringify(updatedItems));
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setTimeout(() => {
      fetchCartItems();
    }, 1000);
  };
  
  const handleLocalRemoveFromCart = (itemIndex) => {
    const updatedItems = localCartItems.filter((_, index) => index !== itemIndex);
    setLocalCartItems(updatedItems);
    localStorage.setItem('cartItemsOffline', JSON.stringify(updatedItems));
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.productId === productId) || {};
  };

  return (
    <>
      {/* Overlay with smooth transition */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Cart Sidebar with improved mobile responsiveness */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header with better styling */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <FaShoppingCart className="text-blue-600 mr-2" size={20} />
            <h2 className="text-xl font-bold text-gray-800">
              Your Cart
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {token ? (cartItems?.items?.length || 0) : localCartItems.length}
              </span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Close cart"
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        {/* Cart Items with better spacing and touch targets */}
        <div className="flex-grow overflow-y-auto p-4">
          {/* Empty state */}
          {(token ? cartItems?.items?.length === 0 : localCartItems.length === 0) ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="text-gray-200 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6 max-w-xs">Looks like you haven't added any products to your cart yet.</p>
              <Link 
                to="/sale" 
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-medium shadow-md hover:shadow-lg active:scale-95"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {(token ? cartItems?.items : localCartItems)?.map((item, index) => {
                const productDetails = token ? item : getProductDetails(item.productId);
                const isRent = (token ? item.productType : item.productType) === "RENT";
                const rentPeriod = token ? item?.productDetail?.rentPeriod : item.rentPeriod;
                const quantity = token ? item?.productDetail?.quantity : item.quantity || 1;
                
                // Calculate prices
                let price, originalPrice;
                if (token) {
                  price = item.price;
                  if (item.productType === "SELL" && item?.productDetail?.sell?.actualPrice) {
                    originalPrice = item?.productDetail?.sell?.actualPrice;
                  }
                } else {
                  price = isRent 
                    ? productDetails?.productFor?.rent?.discountPrice || 0
                    : productDetails?.productFor?.sell?.discountPrice || 0;
                  if (!isRent && productDetails?.productFor?.sell?.actualPrice) {
                    originalPrice = productDetails?.productFor?.sell?.actualPrice;
                  }
                }
                
                const totalPrice = price 
                const totalOriginalPrice = originalPrice ? originalPrice * quantity : null;

                return (
                  <div 
                    key={token ? item?.cartItemId : index} 
                    className="flex border border-gray-200 rounded-lg p-3 relative hover:shadow-sm transition-all bg-white"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                      <img 
                        src={token ? item?.productImages[0] : productDetails?.imageUrls?.[0] || 'https://via.placeholder.com/100'} 
                        alt={token ? item?.productName : productDetails?.name || 'Product'} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="ml-3 flex-grow">
                      <h3 className="font-medium text-gray-800 line-clamp-1">
                        {token ? item.productName : productDetails?.name || 'Product'}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">
                        {isRent ? `Rent (${rentPeriod || 1} months)` : "For Sale"}
                      </p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <div className="text-blue-600 font-semibold">
                            AED {totalPrice.toFixed(2)}
                            {!isRent && totalOriginalPrice && totalOriginalPrice > totalPrice && (
                              <span className="ml-2 text-xs text-gray-400 line-through">
                                AED {totalOriginalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center border rounded-lg bg-gray-50">
                          <button 
                            onClick={() => token 
                              ? handleQuantityChange(item.cartItemId, quantity - 1)
                              : handleLocalQuantityChange(index, quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-2 text-sm w-8 text-center font-medium">
                            {quantity}
                          </span>
                          <button 
                            onClick={() => token 
                              ? handleQuantityChange(item.cartItemId, quantity + 1)
                              : handleLocalQuantityChange(index, quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => token 
                        ? handleRemoveFromCart(item.cartItemId)
                        : handleLocalRemoveFromCart(index)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
                      aria-label="Remove item"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Cart Footer with improved styling */}
        {(token ? cartItems?.items?.length > 0 : localCartItems.length > 0) && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  AED {token ? totalAmount.toFixed(2) : localTotalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">
                  AED {token ? totalAmount.toFixed(2) : localTotalAmount.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {token ? (
                <Link 
                  to="/waterfilterSubscription"
                  onClick={onClose}
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <Link 
                  to="/login"
                  onClick={onClose}
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Login to Checkout
                </Link>
              )}
              <button 
                onClick={onClose}
                className="block w-full py-2.5 mt-2 text-gray-600 hover:text-gray-800 text-center text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

