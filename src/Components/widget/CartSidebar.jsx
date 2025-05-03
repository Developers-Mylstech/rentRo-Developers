import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
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
    fetchCartItems
  } = useCartStore();

  const { token } = useAuthStore();
  const { getProductById, products, fetchSellProducts } = useProductStore();

  const [localCartItems, setLocalCartItems] = useState([]);
  const [localTotalAmount, setLocalTotalAmount] = useState(0);


 
  useEffect(() => {
    if (!token && isOpen) {
      const storedItems = localStorage.getItem('cartItemsOffline');
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          setLocalCartItems(parsedItems);
          

          const total = parsedItems.reduce((sum, item) => sum + (item.productType=="sell"* item.quantity), 0);
          setLocalTotalAmount(total);
          

          if (parsedItems.length > 0 && products.length === 0) {
            fetchSellProducts();
          }
        } catch (error) {
          console.error("Error parsing local cart items:", error);
          setLocalCartItems([]);
          setLocalTotalAmount(0);
        }
      } else {
        setLocalCartItems([]);
        setLocalTotalAmount(0);
      }
    }
  }, [isOpen, token]);

  // Fetch cart items from API when logged in
  useEffect(() => {
    if (isOpen && token) {
      fetchCartItems();
    }
  }, [isOpen, token, fetchCartItems]);

  // Handle quantity change for authenticated users
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
  };
  
  // Handle quantity change for local cart
  const handleLocalQuantityChange = (itemIndex, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = [...localCartItems];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      quantity: newQuantity
    };
    
    setLocalCartItems(updatedItems);
    localStorage.setItem('cartItemsOffline', JSON.stringify(updatedItems));
    
    // Update total amount
    const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setLocalTotalAmount(total);
  };

  // Handle remove from cart for authenticated users
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setTimeout(() => {
      fetchCartItems();
    }, 1000);
  };
  
  // Handle remove from local cart
  const handleLocalRemoveFromCart = (itemIndex) => {
    const updatedItems = localCartItems.filter((_, index) => index !== itemIndex);
    setLocalCartItems(updatedItems);
    localStorage.setItem('cartItemsOffline', JSON.stringify(updatedItems));
    
    // Update total amount
    const total = updatedItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
    setLocalTotalAmount(total);
  };

  // Find product details from products array
  const getProductDetails = (productId) => {
    return products.find(product => product.productId === productId) || {};
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Cart Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>Your Cart</span>
            <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {token ? (cartItems?.items?.length || 0) : localCartItems.length}
            </span>
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-4">
          {/* For authenticated users */}
          {token ? (
            cartItems?.items?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="text-gray-300 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link 
                  to="/sale" 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems?.items?.map((item) => (
                  <div key={item?.cartItemId} className="flex border border-gray-100 rounded-lg p-3 relative hover:shadow-sm transition-shadow">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                      <img 
                        src={item?.productImages[0]} 
                        alt={item?.productName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-3 flex-grow">
                      <h3 className="font-medium text-gray-800">{item.productName}</h3>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.productType === "RENT" ? 
                          `Rent (${item?.productDetail?.rentPeriod} months)` : 
                          "For Sale"}
                      </p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-blue-600 font-semibold">
                          AED {item.price.toFixed(2)}
                          {item.productType === "SELL" && item?.productDetail?.sell?.discountPrice < item?.productDetail?.sell?.actualPrice && (
                            <span className="ml-2 text-xs text-gray-400 line-through">
                              AED {item?.productDetail?.sell?.actualPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.cartItemId, item?.productDetail?.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-2 text-sm w-6 text-center">
                            {item.productDetail.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.cartItemId, item?.productDetail?.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleRemoveFromCart(item.cartItemId)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* For unauthenticated users - local storage cart */
            localCartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="text-gray-300 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link 
                  to="/sale" 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {localCartItems.map((item, index) => {
                  const productDetails = getProductDetails(item.productId);
                  return (
                    <div key={index} className="flex border border-gray-100 rounded-lg p-3 relative hover:shadow-sm transition-shadow">
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                        <img 
                          src={productDetails.imageUrls?.[0]} 
                          alt={productDetails.name || 'Product'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-3 flex-grow">
                        <h3 className="font-medium text-gray-800">{productDetails.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">
                          {item.productType === "RENT" ? 
                            `Rent (${item.rentPeriod || 1} months)` : 
                            "For Sale"}
                        </p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-blue-600 font-semibold">
                           {item.productType === "SELL"? (
                              <span className="">
                                AED {productDetails?.productFor?.sell?.discountPrice.toFixed(2)*item.quantity}
                              </span>
                            ):
                            <span className="">
                                AED {productDetails?.productFor?.rent?.discountPrice.toFixed(2)*item.quantity}
                              </span>
                            }
                          </div>
                          
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => handleLocalQuantityChange(index, (item.quantity || 1) - 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="px-2 text-sm w-6 text-center">
                              {item.quantity || 1}
                            </span>
                            <button 
                              onClick={() => handleLocalQuantityChange(index, (item.quantity || 1) + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleLocalRemoveFromCart(index)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
        
        {/* Cart Footer - Order Summary */}
        {token && cartItems?.items?.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">
                AED {token ? totalAmount.toFixed(2) : localTotalAmount.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-blue-600">
                  AED {token ? totalAmount : localTotalAmount}
                </span>
              </div>
            </div>
            
            {token ? (
              <Link 
                to="/checkout"
                onClick={onClose}
                className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <Link 
                to="/login"
                onClick={onClose}
                className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
              >
                Login to Checkout
              </Link>
            )}
            <button 
              onClick={onClose}
              className="block w-full py-2.5 mt-2 text-gray-600 hover:text-gray-800 text-center text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

