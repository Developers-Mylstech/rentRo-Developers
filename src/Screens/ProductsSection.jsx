// import React from "react";
// import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import "../index.css";

// import "swiper/swiper-bundle.min.css"; // Swiper styles

// // images import
// import img1 from "../assets/Product on Monthly rent/img1.png";
// import img2 from "../assets/Product on Monthly rent/img2.png";
// import img3 from "../assets/Product on Monthly rent/img3.png";
// import img4 from "../assets/Product on Monthly rent/img4.png";
// import img5 from "../assets/Product on Monthly rent/img5.png";

// //Brand logo import
// import Aquaguard from "../assets/OurBrand/Aquaguard.png";
// import Aquapro from "../assets/OurBrand/Aquapro.png";
// import Bluewater from "../assets/OurBrand/Bluewater.png";
// import Culligan from "../assets/OurBrand/Culligan.png";
// import Kent from "../assets/OurBrand/Kent.png";
// import WaterLogic from "../assets/OurBrand/WaterLogic.png";
// import useProductStore from "../Context/ProductContext";

// const products = [
//   {
//     id: 1,
//     name: "Domestic Water Filter",
//     price: "AED50.00",
//     image: img1,
//     rating: 3.5,
//   },
//   {
//     id: 2,
//     name: "Commercial Water Filter",
//     price: "AED100.00",
//     image: img2,
//     rating: 4,
//   },
//   {
//     id: 3,
//     name: "Industrial Water Filter",
//     price: "AED50.00",
//     image: img3,
//     rating: 4.5,
//   },
//   { id: 4, name: "Water Dispenser", price: "AED50.00", image: img4, rating: 4 },
//   { id: 5, name: "Water Cooler", price: "AED50.00", image: img5, rating: 4 },
// ];

// const brands = [
//   { id: 1, name: "Blue Water", image: Bluewater },
//   { id: 2, name: "Aqua Pro", image: Aquapro },
//   { id: 3, name: "Culligan", image: Culligan },
//   { id: 4, name: "Kent Water", image: Kent },
//   { id: 5, name: "Water Logic", image: WaterLogic },
//   { id: 6, name: "Aquaguard", image: Aquaguard },
// ];

// const renderStars = (rating) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 !== 0;
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

//   return (
//     <div className="flex text-yellow-500">
//       {[...Array(fullStars)].map((_, i) => (
//         <FaStar key={i} />
//       ))}
//       {halfStar && <FaStarHalfAlt />}
//       {[...Array(emptyStars)].map((_, i) => (
//         <FaRegStar key={i} />
//       ))}
//     </div>
//   );
// };

// const ProductsSection = () => {

//   const { fetchRentProducts, rentProducts,loading } = useProductStore()
//   return (
//     <>
//     <div className="mx-auto py-20 px-4">
//       {/* Products On Rent */}
//       <div className="flex justify-center items-center">
//      <div className="relative inline-flex">
//       <span className="text-white w-20%  bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl animate-pulse">
//         Just for You
//       </span>
//       <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
//     </div>
//      </div>
//       <h1 className="text-center text-blue-800  text-2xl font-bold my-4">
//         Products On Monthly Rent
//       </h1>

//       <Swiper
//         spaceBetween={20}
//         centeredSlides={true}
//         loop={true}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 1.4 },
//           1024: { slidesPerView: 2.3 },
//           1280: { slidesPerView: 3.5 },
//         }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         className="w-full relative"
//       >
//         {products.map((product) => (
//           <SwiperSlide
//             key={product.id}
//             className="p-4 border rounded-lg shadow hover:shadow-lg transition"
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full object-cover mb-3"
//             />
//             <h3 className="text-red-500 font-bold">{product.price}</h3>
//             <p className="text-gray-700 text-sm">{product.name}</p>
//             <div className="mt-2">{renderStars(product.rating)}</div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

     

//       {/* New Products Section */}
//       <div className="flex justify-center py-8 items-center mt-20">
//      <div className="relative inline-flex ">
//       <span className="text-white w-20%  bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl animate-pulse">
//         Just for You
//       </span>
//       <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
//     </div>
//      </div>
//       <h1 className="text-center text-2xl font-bold my-4 text-blue-800">New Products</h1>

//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={20}
//         centeredSlides={true}
//         loop={true}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 1.4 },
//           1024: { slidesPerView: 2.3 },
//           1280: { slidesPerView: 3.5 },
//         }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         className="w-full relative"
//       >
//         {products.map((product) => (
//           <SwiperSlide
//             key={product.id}
//             className="p-4 border rounded-lg shadow hover:shadow-lg transition"
//           >
//             <div className="w-full  flex flex-col items-center justify-center">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-1/2 object-cover mb-3"
//               />
//               <p className="text-gray-700 text-sm">{product.name}</p>
//               <div className="mt-2">{renderStars(product.rating)}</div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//     {/* <BottomNav/> */}
//     </>
//   );
// };

// export default ProductsSection;



import React, { useEffect } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaShoppingCart, FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import useProductStore from "../Context/ProductContext";

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

  useEffect(() => {
    fetchRentProducts();
  }, [fetchRentProducts]);


  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
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
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Products On Rent Section */}
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
        {rentProducts.map((product) => (
          <SwiperSlide key={product?.productId}>
            <div 
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product?.imageUrls[0]}
                  alt={product?.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                {/* Wishlist Button */}
                <button 
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to wishlist logic
                  }}
                >
                  <FaHeart className="text-gray-600 hover:text-red-500" />
                </button>
                {/* Discount Badge */}
                {product.productFor?.rent?.discountPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product?.productFor?.rent?.discountValue}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {product?.name}
                  </h3>
                  {product.brand && (
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1 py-1 rounded">
                      {product?.brand?.name}
                    </span>
                  )}
                </div>

                {/* Rating */}
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

            

                {/* Add to Cart Button */}
                <button
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                  onClick={() => handleProductClick(product)}
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
              onClick={() => handleProductClick(product)}
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

              <button
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                  onClick={() => handleProductClick(product)}
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
                </div>

                {/* Add to Cart Button */}
              
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSection;