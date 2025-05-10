

// import React, { useEffect } from "react";
// import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaShoppingCart, FaCheck } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import { useNavigate } from "react-router-dom";
// import useProductStore from "../Context/ProductContext";


// const renderStars = (rating) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 !== 0;
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//   return (
//     <div className="flex text-yellow-500 text-sm">
//       {[...Array(fullStars)].map((_, i) => (
//         <FaStar key={`full-${i}`} />
//       ))}
//       {halfStar && <FaStarHalfAlt />}
//       {[...Array(emptyStars)].map((_, i) => (
//         <FaRegStar key={`empty-${i}`} />
//       ))}
//     </div>
//   );
// };

// const ProductsSection = () => {
//   const navigate = useNavigate();
//   const { fetchRentProducts, rentProducts, loading } = useProductStore();

//   useEffect(() => {
//     fetchRentProducts();
//   }, [fetchRentProducts]);


//   const handleProductClick = (product) => {
//     navigate(`/product/${product.name}`, { state: { product } });
//   };

//   const SectionHeader = ({ title, subtitle }) => (
//     <div className="text-center mb-10">
//       <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-2">
//         {subtitle}
//       </span>
//       <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
//       <div className="w-20 h-1 bg-blue-500 mx-auto mt-2"></div>
//     </div>
//   );

//   console.log(rentProducts,'rentProducts')
//   return (
//     <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//       <SectionHeader
//         title="Products On Monthly Rent"
//         subtitle="Just for You"
//       />
//       <Swiper
//         modules={[Autoplay, Navigation]}
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         breakpoints={{
//           640: { slidesPerView: 1.5 },
//           768: { slidesPerView: 2.2 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 4 },
//         }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         className="pb-12"
//       >
//         {rentProducts?.map((product) => (
//           <SwiperSlide key={product?.productId}>
//             <div
//               onClick={() => handleProductClick(product)}
//               className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//             >
      
//               <div className="relative h-64 overflow-hidden">
//                 {
//                   product && (
//                     <img
//                       src={product?.imageUrls[0] }
//                       alt={product?.name}
//                       className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
//                     />
//                   )
//                 }


//                 {/* Wishlist Button */}
//                 <button
//                   className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     // Add to wishlist logic
//                   }}
//                 >
//                   <FaHeart className="text-gray-600 hover:text-red-500" />
//                 </button>
//                 {/* Discount Badge */}
//                 {product.productFor?.rent?.discountPrice && (
//                   <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//                     {product?.productFor?.rent?.discountValue}% OFF
//                   </div>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="p-1">
//                 <div className="flex justify-between items-start mb-2 relative">
//                   <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
//                     {product?.name}
//                   </h3>
//                   {product.brand && (
//                     <span className="text-[10px] text-xs absolute -top-5 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                       {product?.brand?.name}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center mb-3">
//                   {renderStars(5)}
//                   <span className="text-xs text-gray-500 ml-1">(20 reviews)</span>
//                 </div>

//                 {/* Price */}
//                 <div className="mb-4">
//                   {product.productFor?.rent?.discountPrice ? (
//                     <>
//                       <span className="text-xl font-bold text-gray-900">
//                         AED {product?.productFor?.rent?.discountPrice}/mo
//                       </span>
//                       <span className="ml-2 text-sm text-gray-500 line-through">
//                         AED {product.productFor.rent.monthlyPrice}
//                       </span>
//                     </>
//                   ) : (
//                     <span className="text-xl font-bold text-gray-900">
//                       AED {product.productFor?.rent?.monthlyPrice}/mo
//                     </span>
//                   )}
//                 </div>



//                 {/* Add to Cart Button */}
//                 <button
//                   className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
//                   onClick={() => handleProductClick(product)}
//                 >
//                   <FaShoppingCart />
//                   <span>Rent Now</span>
//                 </button>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* New Products Section */}
//       <SectionHeader
//         title="New Products"
//         subtitle="Latest Arrivals"
//       />

//       <Swiper
//         modules={[Autoplay, Navigation]}
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         breakpoints={{
//           640: { slidesPerView: 1.5 },
//           768: { slidesPerView: 2.2 },
//           1024: { slidesPerView: 3 },
//           1280: { slidesPerView: 4 },
//         }}
//         autoplay={{ delay: 5000, disableOnInteraction: false }}
//         className="pb-12"
//       >
//         {rentProducts.map((product) => (
//           <SwiperSlide key={product?.productId}>
//             <div
//               onClick={() => handleProductClick(product)}
//               className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//             >
//               {/* Product Image */}
//               <div className="relative h-64 overflow-hidden">
//                 <img
//                   src={product?.imageUrls[0]}
//                   alt={product?.name}
//                   className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
//                 />
//                 {/* New Badge */}
//                 <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
//                   NEW
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="p-5">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
//                   {product.name}
//                 </h3>

//                 {/* Rating */}
//                 <div className="flex items-center mb-3">
//                   {renderStars(5)}
//                   <span className="text-xs text-gray-500 ml-1">(0 reviews)</span>
//                 </div>

//                 {/* Price */}
//                 <div className="mb-4">
//                   {product.productFor?.sell?.discountPrice ? (
//                     <>
//                       <span className="text-xl font-bold text-gray-900">
//                         AED {product?.productFor?.sell?.discountPrice}
//                       </span>
//                       <span className="ml-2 text-sm text-gray-500 line-through">
//                         AED {product?.productFor?.sell?.actualPrice}
//                       </span>
//                     </>
//                   ) : (
//                     <span className="text-xl font-bold text-gray-900">
//                       AED {product.productFor?.sell?.actualPrice}
//                     </span>
//                   )}

//               <button
//                   className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
//                   onClick={() => handleProductClick(product)}
//                 >
//                   <FaShoppingCart />
//                   <span>Add to Cart</span>
//                 </button>
//                 </div>

//                 {/* Add to Cart Button */}
              
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ProductsSection;


import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaShoppingCart, FaCheck, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useProductStore from "../Context/ProductContext";
import useWishlistStore from "../Context/WishlistContext";
import useAuthStore from "../Context/AuthContext";

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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`relative flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg ${
        type === "added" 
          ? "bg-gradient-to-r from-pink-50 to-white border-pink-100" 
          : "bg-gradient-to-r from-gray-50 to-white border-gray-200"
      } border max-w-md`}
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
      <div className={`absolute bottom-0 left-0 h-1 w-full ${
        type === "added" 
          ? "bg-gradient-to-r from-pink-400 to-pink-300" 
          : "bg-gradient-to-r from-gray-400 to-gray-300"
      }`} />
    </motion.div>
  );
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500 text-sm">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};

const ProductsSection = () => {
  const navigate = useNavigate();
  const { fetchRentProducts, rentProducts, loading } = useProductStore();
  const { wishlist, addToWishlist, removeFromWishlist, fetchWishlist } = useWishlistStore();
  const { token } = useAuthStore();
  const [activeToasts, setActiveToasts] = useState([]);
  const [wishlistState, setWishlistState] = useState({});

  useEffect(() => {
    fetchRentProducts();
    if (token) {
      fetchWishlist();
    }
  }, [fetchRentProducts, fetchWishlist, token]);

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
    navigate(`/product/${product.name}`, { state: { product } });
  };

  const toggleWishlist = async (e, productId) => {
    e.stopPropagation();
    
    if (!token) {
      navigate('/login');
      return;
    }

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

  const isInWishlist = (productId) => {
    return wishlistState[productId] || wishlist.some(item => item.productId === productId);
  };

  const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center mb-10">
      <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-2">
        {subtitle}
      </span>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <div className="w-20 h-1 bg-blue-500 mx-auto mt-2"></div>
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8  mx-auto relative">
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

      <SectionHeader
        title="Products On Monthly Rent"
        subtitle="Just for You"
      />
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="pb-12"
      >
        {rentProducts?.map((product) => (
          <SwiperSlide key={product?.productId}>
            <div
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                {product?.imageUrls?.[0] && (
                  <img
                    src={product.imageUrls[0]}
                    alt={product?.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Wishlist Button */}
                <button
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
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
                          : "text-gray-600 hover:text-red-500"
                      }`}
                    />
                  </motion.div>
                </button>

                {/* Discount Badge */}
                {product.productFor?.rent?.discountPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product?.productFor?.rent?.discountValue}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-1">
                <div className="flex justify-between items-start mb-2 relative">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product?.name}
                  </h3>
                  {product.brand && (
                    <span className="text-[10px] text-xs absolute -top-5 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {product?.brand?.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-3">
                  {renderStars(5)}
                  <span className="text-xs text-gray-500 ml-1">(20 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {product.productFor?.rent?.discountPrice ? (
                    <>
                      <span className="text-xl font-bold text-gray-900">
                        AED {product?.productFor?.rent?.discountPrice}/mo
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        AED {product.productFor.rent.monthlyPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      AED {product.productFor?.rent?.monthlyPrice}/mo
                    </span>
                  )}
                </div>

                {/* Rent Now Button */}
                <button
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  <FaShoppingCart />
                  <span>Rent Now</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* New Products Section */}
      <SectionHeader
        title="New Products"
        subtitle="Latest Arrivals"
      />

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="pb-12"
      >
        {rentProducts.map((product) => (
          <SwiperSlide key={product?.productId}>
            <div
              // onClick={() => handleProductClick(product)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product?.imageUrls[0]}
                  alt={product?.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                {/* New Badge */}
                <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>

                {/* Wishlist Button */}
                <button
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
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
                          : "text-gray-600 hover:text-red-500"
                      }`}
                    />
                  </motion.div>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {renderStars(5)}
                  <span className="text-xs text-gray-500 ml-1">(0 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  {product.productFor?.sell?.discountPrice ? (
                    <>
                      <span className="text-xl font-bold text-gray-900">
                        AED {product?.productFor?.sell?.discountPrice}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        AED {product?.productFor?.sell?.actualPrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      AED {product.productFor?.sell?.actualPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSection;