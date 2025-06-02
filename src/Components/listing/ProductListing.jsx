
// import React, { useEffect, useState } from "react";
// import notFount from "../../assets/notFound.png";
// import { useNavigate } from "react-router-dom";
// import { FaStar, FaRegStar, FaHeart, FaEye } from "react-icons/fa";
// import { motion } from "framer-motion";
// import useWishlistStore from "../../Context/WishlistContext";
// import useAuthStore from "../../Context/AuthContext";
// import FloatingHeart from "../widget/FloatingHeart";

// const ProductList = ({ products }) => {
//   const navigate = useNavigate();
//   const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useWishlistStore();
//   const [wishlistState, setWishlistState] = useState({});
//   const {token} = useAuthStore();

//   // Fetch wishlist on component mount
//   useEffect(() => {
//     fetchWishlist();
//   }, [fetchWishlist]);

//   // Update local wishlist state whenever the wishlist changes
//   useEffect(() => {
//     const newWishlistState = {};
//     wishlist.forEach(item => {
//       newWishlistState[item.productId] = true;
//     });
//     setWishlistState(newWishlistState);
//   }, [wishlist]);

//   const handleProductClick = (product) => {
//     navigate(`/product/${product?.name}`, { state: { product } });
//   };

//   const toggleWishlist = async (e, productId) => {
//     e.stopPropagation();
    
//     try {
//       if (isInWishlist(productId)) {
//         await removeFromWishlist(productId);
//         // Update local state immediately for UI feedback
//         setWishlistState(prev => ({
//           ...prev,
//           [productId]: false
//         }));
//       } else {
//         await addToWishlist(productId);
//         // Update local state immediately for UI feedback
//         setWishlistState(prev => ({
//           ...prev,
//           [productId]: true
//         }));
//       }
//       // Refresh wishlist after operation
//       fetchWishlist();
//     } catch (error) {
//       console.error("Error toggling wishlist item:", error);
//     }
//   };

//   const calculateRating = (reviews) => {
//     if (!reviews || reviews.length === 0) return 0;
//     const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
//     return sum / reviews.length;
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<FaStar key={i} className="text-yellow-400 text-sm opacity-70" />);
//       } else {
//         stars.push(<FaRegStar key={i} className="text-yellow-400 text-sm" />);
//       }
//     }

//     return stars;
//   };

//   const isInWishlist = (productId) => {
//     return wishlistState[productId] || wishlist.some(item => item.productId === productId);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {products?.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.map((product, index) => (
//             <motion.div
//               key={product._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleProductClick(product)}
//               className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group relative"
//             >
//               {/* Product Badges */}
//               <div className="absolute top-3 left-3 z-10 flex gap-2">
//                 {product?.isNew && (
//                   <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
//                     New
//                   </span>
//                 )}
//                 {product?.isBestSeller && (
//                   <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
//                     Bestseller
//                   </span>
//                 )}
//                 {product?.discountPercentage > 0 && (
//                   <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
//                     {product?.discountPercentage}% OFF
//                   </span>
//                 )}
//               </div>

//               {/* Wishlist Button */}
//              {
//               token != null &&(
//                 <button
//                 className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all"
//                 onClick={(e) => toggleWishlist(e, product.productId)}
//               >
//                 <FaHeart
//                   className={`text-lg ${
//                     isInWishlist(product.productId) ? "text-red-500" : "text-gray-400 hover:text-red-400"
//                   }`}
//                 />
//               </button>
//               )
//              }

      //         {/* Product Image */}
      //         <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
      //           <img
      //             src={product?.imageUrls[0]}
      //             alt={product?.name}
      //             className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  
      //           />
      //           <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      //         </div>

      //         {/* Product Info */}
      //         <div className="p-4">
      //           <div className="flex justify-between items-start mb-2">
      //             <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
      //               {product?.name}
      //             </h3>
      //             {product?.tagNKeywords?.length > 0 && (
      //               <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
      //                 #{product?.tagNKeywords[0]}
      //               </span>
      //             )}
      //           </div>

      //           {/* Rating */}
      //           {product?.reviews?.length > 0 && (
      //             <div className="flex items-center mb-2">
      //               <div className="flex mr-1">
      //                 {renderStars(calculateRating(product.reviews))}
      //               </div>
      //               <span className="text-xs text-gray-500">
      //                 ({product.reviews.length})
      //               </span>
      //             </div>
      //           )}

      //           <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
      //             {product?.description}
      //           </p>

      //           {/* Price */}
      //           <div className="flex items-center justify-between">
      //             <div>
      //               {product.productFor?.sell?.discountPrice ? (
      //                 <>
      //                   <span className="text-lg font-bold text-gray-900">
      //                     AED {product?.productFor?.sell?.discountPrice}
      //                   </span>
      //                   {product?.productFor?.sell?.discountPrice <
      //                     product?.productFor?.sell?.actualPrice && (
      //                     <span className="ml-2 text-sm text-gray-500 line-through">
      //                       AED {product?.productFor?.sell?.actualPrice}
      //                     </span>
      //                   )}
      //                 </>
      //               ) : product.productFor?.rent?.discountPrice ? (
      //                 <span className="text-lg font-bold text-gray-900">
      //                   AED {product?.productFor?.rent?.discountPrice}/mo
      //                 </span>
      //               ) : (
      //                 <span className="text-lg font-bold text-gray-900">
      //                   Price on request
      //                 </span>
      //               )}
      //             </div>
      //           </div>

      //           {/* Quick View Button */}
      //           <div className="absolute bottom-0 left-0 right-0 bg-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-lg rounded-b-xl">
      //             <button
      //               className="w-full py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2"
      //               onClick={(e) => {
      //                 e.stopPropagation();
      //                 handleProductClick(product);
      //               }}
      //             >
      //               <FaEye />
      //               <span>View product</span>
      //             </button>
      //           </div>
      //         </div>
      //       </motion.div>
      //     ))}
      //   </div>
      // ) : (
      //   <div className="flex flex-col items-center justify-center py-20">
      //     <img
      //       src={notFount}
      //       alt="No products found"
      //       className="h-40 w-auto mb-6 opacity-70"
      //     />
      //     <h3 className="text-xl font-medium text-gray-700 mb-2">
      //       No Products Found
      //     </h3>
      //     <p className="text-gray-500 mb-6">
      //       We couldn't find any products matching your criteria.
      //     </p>
      //     <button
      //       onClick={() => navigate("/")}
      //       className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      //     >
      //       Browse All Products
      //     </button>
      //   </div>
      // )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import notFount from "../../assets/notFound.png";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useWishlistStore from "../../Context/WishlistContext";
import useAuthStore from "../../Context/AuthContext";

// Beautiful Toast Component
const WishlistToast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 20, scale: 1 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`fixed top-0 right-4 transform -translate-x-1/2 mt-5 z-50 flex items-center gap-3 px-6 py-4 rounded-t-xl shadow-lg ${
        type === "added" 
          ? "bg-gradient-to-r from-pink-50 to-white border-pink-100" 
          : "bg-gradient-to-r from-gray-50 to-white border-gray-200"
      } border `}
    >
      <div className={`p-2 rounded-full ${
        type === "added" ? "bg-pink-100" : "bg-gray-100"
      }`}>
        {type === "added" ? (
          <FaHeart className="text-pink-500 text-xl" />
        ) : (
          <FaTimes className="text-gray-500 text-xl" />
        )}
      </div>
      <div>
        <p className="font-medium text-gray-800">{message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {type === "added" 
            ? "Item saved to your wishlist" 
            : "Item removed from collection"}
        </p>
      </div>
      <div className={`absolute  bottom-0 left-0 h-1 w-full ${
        type === "added" 
          ? "bg-gradient-to-r from-pink-400 to-pink-300" 
          : "bg-gradient-to-r from-gray-400 to-gray-300"
      }`} />
    </motion.div>
  );
};

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useWishlistStore();
  const [wishlistState, setWishlistState] = useState({});
  const { token } = useAuthStore();
  const [activeToasts, setActiveToasts] = useState([]);

  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Update local wishlist state
  useEffect(() => {
    const newWishlistState = {};
    wishlist.forEach(item => {
      newWishlistState[item.productId] = true;
    });
    setWishlistState(newWishlistState);
  }, [wishlist]);

  const showToast = (message, type) => {
    const id = Date.now();
    setActiveToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product?.name}`, { state: { product } });
  };

  const toggleWishlist = async (e, productId) => {
    e.stopPropagation();
    
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        setWishlistState(prev => ({ ...prev, [productId]: false }));
        showToast("Removed from wishlist", "removed");
      } else {
        await addToWishlist(productId);
        setWishlistState(prev => ({ ...prev, [productId]: true }));
        showToast("Added to wishlist", "added");
      }
      fetchWishlist();
    } catch (error) {
      console.error("Error toggling wishlist item:", error);
    }
  };

  const calculateRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm opacity-70" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 text-sm" />);
      }
    }

    return stars;
  };

  const isInWishlist = (productId) => {
    return wishlistState[productId] || wishlist.some(item => item.productId === productId);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <AnimatePresence>
          {activeToasts.map(toast => (
            <WishlistToast 
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group relative"
            >
              {/* Product Badges */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {product?.isNew && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    New
                  </span>
                )}
                {product?.isBestSeller && (
                  <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    Bestseller
                  </span>
                )}
                {product?.discountPercentage > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    {product?.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              {token != null && (
                <button
                  className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all"
                  onClick={(e) => toggleWishlist(e, product.productId)}
                >
                  <motion.div
                    animate={{
                      scale: isInWishlist(product.productId) ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaHeart
                      className={`text-lg ${
                        isInWishlist(product.productId)
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    />
                  </motion.div>
                </button>
              )}

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={product?.images[0]?.imageUrl}
                  alt={product?.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product?.name}
                  </h3>
                  {product?.tagNKeywords?.length > 0 && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {product?.category?.name[0]}
                    </span>
                  )}
                </div>

                {/* Rating */}
                {product?.reviews?.length > 0 && (
                  <div className="flex items-center mb-2">
                    <div className="flex mr-1">
                      {renderStars(calculateRating(product.reviews))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product?.reviews?.length})
                    </span>
                  </div>
                )}

              
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    {product.productFor?.sell?.discountPrice ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          AED {product?.productFor?.sell?.discountPrice.toFixed(2)}
                        </span>
                        {product?.productFor?.sell?.discountPrice <
                          product?.productFor?.sell?.actualPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            AED {product?.productFor?.sell?.actualPrice.toFixed(2)}
                          </span>
                        )}
                      </>
                    ) : product.productFor?.rent?.discountPrice ? (
                      <span className="text-lg font-bold text-gray-900">
                        AED {product?.productFor?.rent?.discountPrice.toFixed(2)}/mo
                      </span>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        Price on request
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick View Button */}
                <div className="p-4 shadow-lg rounded-b-xl">
                  <button
                    className="w-full py-2 text-blue-600  rounded-lg border-2 border-blue-600 flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <FaEye />
                    <span>View product</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src={notFount}
            alt="No products found"
            className="h-40 w-auto mb-6 opacity-70"
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6">
            We couldn't find any products matching your criteria.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;