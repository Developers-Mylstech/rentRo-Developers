

// import React from "react";
// import notFount from "../../assets/notFound.png";
// import { useNavigate } from "react-router-dom";
// import { FaStar, FaRegStar, FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
// import { motion } from "framer-motion";

// const ProductList = ({ products }) => {
//   const navigate = useNavigate();

//   const handleProductClick = (product) => {
//     navigate(`/product/${product?.name}`, { state: { product } });
//   };

//   // Calculate average rating
//   const calculateRating = (reviews) => {
//     if (!reviews || reviews.length === 0) return 0;
//     const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
//     return sum / reviews.length;
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<FaStar key={i} className="text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<FaStar key={i} className="text-yellow-400 opacity-70" />);
//       } else {
//         stars.push(<FaRegStar key={i} className="text-yellow-400" />);
//       }
//     }

//     return stars;
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {products?.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {products.map((product, index) => (
//             <motion.div
//               key={index}
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
//               <button 
//                 className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-all"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   // Handle wishlist logic here
//                 }}
//               >
//                 <FaHeart className="text-gray-600 hover:text-red-500" />
//               </button>

//               {/* Product Image */}
//               <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
//                 <img
//                   src={product?.imageUrls[0]}
//                   alt={product?.name}
//                   className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>

//               {/* Product Info */}
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
//                     {product?.name}
//                   </h3>
//                   {product?.tagNKeywords?.length > 0 && (
//                     <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
//                       #{product?.tagNKeywords[0]}
//                     </span>
//                   )}
//                 </div>

//                 {/* Rating */}
//                 {product?.reviews?.length > 0 && (
//                   <div className="flex items-center mb-2">
//                     <div className="flex mr-1">
//                       {renderStars(calculateRating(product.reviews))}
//                     </div>
//                     <span className="text-xs text-gray-500">
//                       ({product.reviews.length})
//                     </span>
//                   </div>
//                 )}

//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
//                   {product?.description}
//                 </p>

//                 {/* Price */}
//                 <div className="flex items-center justify-between">
//                   <div>
//                     {product.productFor?.sell?.discountPrice ? (
//                       <>
//                         <span className="text-lg font-bold text-gray-900">
//                           AED {product?.productFor?.sell?.discountPrice}
//                         </span>
//                         {product?.productFor?.sell?.discountPrice < product?.productFor?.sell?.actualPrice && (
//                           <span className="ml-2 text-sm text-gray-500 line-through">
//                             AED {product?.productFor?.sell?.actualPrice}
//                           </span>
//                         )}
//                       </>
//                     ) : product.productFor?.rent?.discountPrice ? (
//                       <span className="text-lg font-bold text-gray-900">
//                         AED {product?.productFor?.rent?.discountPrice}/mo
//                       </span>
//                     ) : (
//                       <span className="text-lg font-bold text-gray-900">
//                         Price on request
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quick Add to Cart (on hover) */}
//                 <div className="absolute bottom-0 left-0 right-0 bg-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-lg rounded-b-xl">
//                   <button
//                     className="w-full py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2"
//                     onClick={() => {
//                       handleProductClick(product);
//                       // Handle add to cart logic here
//                     }}
//                   >
//                     <FaEye />
//                     <span>View product</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center py-20">
//           <img
//             src={notFount}
//             alt="No products found"
//             className="h-40 w-auto mb-6 opacity-70"
//           />
//           <h3 className="text-xl font-medium text-gray-700 mb-2">
//             No Products Found
//           </h3>
//           <p className="text-gray-500 mb-6">
//             We couldn't find any products matching your criteria.
//           </p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Browse All Products
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;


import React from "react";
import notFount from "../../assets/notFound.png";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product?.name}`, { state: { product } });
  };

  // Calculate average rating
  const calculateRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  // Render star rating
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

  // Format price with commas
  const formatPrice = (price) => {
    return price?.toLocaleString('en-US');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer group relative border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {/* Product Badges */}
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {product?.isNew && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-md shadow-sm">
                    New
                  </span>
                )}
                {product?.isBestSeller && (
                  <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-md shadow-sm">
                    Bestseller
                  </span>
                )}
                {product?.discountPercentage > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md shadow-sm">
                    {product?.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button 
                className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle wishlist logic here
                }}
              >
                <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" />
              </button>

              {/* Product Image */}
              <div className="relative h-60 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={product?.imageUrls[0]}
                  alt={product?.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-4 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-md font-medium text-gray-800 line-clamp-1">
                    {product?.name}
                  </h3>
                  {product?.brand && (
                    <span className="text-xs absolute top-2 right-2 px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                      {product?.brand?.name}
                    </span>
                  )}
                </div>

                {/* Rating */}
                {/* {product?.reviews?.length > 0 && (
                  <div className="flex items-center mb-1">
                    <div className="flex mr-1">
                      {renderStars(calculateRating(product.reviews))}
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.reviews.length})
                    </span>
                  </div>
                )} */}

                <p className="text-gray-500 text-sm mb-1 line-clamp-2 h-10">
                  {product?.description}
                </p>

                {/* Price */}
                <div className="mb-2">
                  {product.productFor?.sell?.discountPrice ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">
                        AED {formatPrice(product?.productFor?.sell?.discountPrice)}
                      </span>
                      {product?.productFor?.sell?.discountPrice < product?.productFor?.sell?.actualPrice && (
                        <span className="ml-1 text-sm text-gray-400 line-through">
                          AED {formatPrice(product?.productFor?.sell?.actualPrice)}
                        </span>
                      )}
                    </>
                  ) : product.productFor?.rent?.discountPrice ? (
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        AED {formatPrice(product?.productFor?.rent?.discountPrice)}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">/month</span>
                    </div>
                  ) : (
                    <span className="text-gray-600">
                      Price on request
                    </span>
                  )}
                </div>

                {/* Quick View Button */}
             
                  <button
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm mt-2 hover:from-blue-600 hover:to-blue-700 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <FaEye className="text-sm" />
                    <span>Quick View</span>
                  </button>
            
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={notFount}
            alt="No products found"
            className="h-40 w-auto mb-6 opacity-80"
          />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            We couldn't find any products matching your criteria.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Browse All Products
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;