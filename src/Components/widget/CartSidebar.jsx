// import React, { useEffect } from "react";
// import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import useCartStore from "../../Context/CartContext";

// const CartSidebar = ({ isOpen, onClose }) => {
//   const { 
//     cartItems, 
//     totalItems, 
//     totalAmount, 
//     removeFromCart,
//     updateCartItemQuantity,
//     fetchCartItems
//   } = useCartStore();

//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
//     updateCartItemQuantity(itemId, newQuantity);
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, [fetchCartItems]);

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={onClose}
//         />
//       )}
      
//       {/* Cart Sidebar */}
//       <div 
//         className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } flex flex-col`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <span>Your Cart</span>
//             <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//               {totalItems}
//             </span>
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>
        
//         {/* Cart Items */}
//         <div className="flex-grow overflow-y-auto p-4">
//           {cartItems?.items?.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-center">
//               <div className="text-gray-400 mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-700 mb-2">Your cart is empty</h3>
//               <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
//               <Link 
//                 to="/sale" 
//                 onClick={onClose}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Start Shopping
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cartItems?.items?.map((item) => (
//                 <div key={item.id} className="flex border rounded-lg p-3 relative">
//                   <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
//                     <img 
//                       src={item?.productImage || 'https://via.placeholder.com/80'} 
//                       alt={item?.productName} 
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
                  
//                   <div className="ml-3 flex-grow">
//                     <h3 className="font-medium text-gray-800 line-clamp-1">{item.productName}</h3>
//                     <p className="text-sm text-gray-500 mb-1">
//                       {item.productType === "RENT" ? `Rent (${item.rentPeriod} months)` : "Sale"}
//                     </p>
//                     <div className="flex justify-between items-center mt-2">
//                       <div className="text-blue-600 font-semibold">
//                         AED {item.price.toFixed(2)}
//                       </div>
                      
//                       {item.productType === "SELL" && (
//                         <div className="flex items-center border rounded-md">
//                           <button 
//                             onClick={() => handleQuantityChange(item.id, item.sellQuantity - 1)}
//                             className="px-2 py-1 text-gray-600 hover:bg-gray-100"
//                           >
//                             <FaMinus size={12} />
//                           </button>
//                           <span className="px-2 text-sm">{item.sellQuantity}</span>
//                           <button 
//                             onClick={() => handleQuantityChange(item.id, item.sellQuantity + 1)}
//                             className="px-2 py-1 text-gray-600 hover:bg-gray-100"
//                           >
//                             <FaPlus size={12} />
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <button 
//                     onClick={() => removeFromCart(item.id)}
//                     className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
//                   >
//                     <FaTrash size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Footer */}
//         {cartItems.length > 0 && (
//           <div className="border-t p-4">
//             <div className="flex justify-between mb-4">
//               <span className="text-gray-600">Subtotal</span>
//               <span className="font-semibold">AED {totalAmount.toFixed(2)}</span>
//             </div>
//             <Link 
//               to="/checkout"
//               onClick={onClose}
//               className="block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-colors"
//             >
//               Checkout
//             </Link>
//             <button 
//               onClick={onClose}
//               className="block w-full py-2 mt-2 text-gray-600 hover:text-gray-800 text-center"
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



import React, { useEffect } from "react";
import { FaTrash, FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCartStore from "../../Context/CartContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    totalItems, 
    totalAmount, 
    removeFromCart,
    updateCartItemQuantity,
    fetchCartItems
  } = useCartStore();

  // Fake data matching your response structure
  const fakeCartData = {
    cartId: 9007199254740991,
    userId: 9007199254740991,
    items: [
      {
        cartItemId: 1,
        productId: 101,
        productName: "Premium Office Chair",
        productDescription: "Ergonomic office chair with lumbar support",
        productType: "SELL",
        price: 299.99,
        productDetail: {
          sell: {
            sellId: 9007199254740991,
            actualPrice: 349.99,
            discountPrice: 299.99,
            vat: 0.05,
            benefits: ["5-year warranty", "Free assembly"],
            warrantPeriod: 5,
            discountUnit: "PERCENTAGE",
            discountValue: 15
          },
          quantity: 2
        },
        productImage: "https://m.media-amazon.com/images/I/61nG4q8VBAL._AC_SL1500_.jpg",
        sellQuantity: 1
      },
      {
        cartItemId: 2,
        productId: 102,
        productName: "Conference Room Table",
        productDescription: "Large oak conference table",
        productType: "RENT",
        price: 199.99,
        productDetail: {
          rent: {
            rentId: 9007199254740992,
            monthlyPrice: 199.99,
            discountPrice: 179.99,
            vat: 0.05,
            benefits: ["Free delivery", "Monthly maintenance"],
            discountValue: 10,
            discountUnit: "PERCENTAGE"
          },
          rentPeriod: 12,
          quantity: 1
        },
        productImage: "https://www.ikea.com/us/en/images/products/ingatorp-extendable-table-black__0736968_pe740925_s5.jpg",
        rentQuantity: 1
      }
    ]
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
  };
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    useEffect(() => {
      fetchCartItems();
    }, [fetchCartItems]);
  };

  useEffect(() => {
    // Only fetch cart items when the sidebar opens
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]); // Only depend on isOpen, not fetchCartItems

 




  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50  transition-opacity z-50 duration-300"
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
              {cartItems?.items?.length}
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
          {cartItems?.items?.length == 0 ? (
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
                        {item.productType === "SELL" || "RENT" && item?.productDetail?.sell?.discountPrice < item?.productDetail?.sell?.actualPrice && (
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
                          { item.productDetail.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.cartItemId,  item?.productDetail?.quantity + 1)}
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
          )}
        </div>
        

        {cartItems?.items?.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">AED {totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-600">VAT (5%)</span>
              <span className="text-gray-600">AED {(totalAmount * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-blue-600">AED {(totalAmount * 1.05).toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/waterfilterSubscription"
              onClick={onClose}
              className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
            >
              Proceed to Checkout
            </Link>
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

