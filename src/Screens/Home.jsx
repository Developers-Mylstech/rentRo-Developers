

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance"; // Adjust import path
// import Clients from "./Clients";
// import Services from "./Services";
// import ProductsSection from "./ProductsSection";
// import HeroVideo2 from "../assets/HeroVideo21.mp4";
// import Marquee from "react-fast-marquee";
// import OurBrand from "../Components/widget/OurBrand.jsx";
// import BannerCarousel from "../Components/widget/BannerCarousel.jsx";
// import mobileBanner from "../assets/mobileBanner.jpg";
// import ProductList from "../Components/listing/ProductListing.jsx";
// import useProductStore from "../Context/ProductContext.js";
// import ProductsForRQ from "../Components/listing/ProductsForRQ.jsx";

// const Home = () => {
//   const ourBrandSection = useRef(null);
//   const { products, fetchProducts } = useProductStore();
//   const [brands, setBrands] = useState([]);
//   const [loadingBrands, setLoadingBrands] = useState(true);
//   const [brandsError, setBrandsError] = useState(null);
//   const [banners, setBanners] = useState([]);
//   const [loadingBanners, setLoadingBanners] = useState(true);
//   const [bannersError, setBannersError] = useState(null);

//   const scrollToClient = (elementRef) => {
//     window.scrollTo({
//       top: elementRef.current.offsetTop,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchBrands();
//     fetchBanners();
//   }, []);

//   const fetchBrands = async () => {
//     try {
//       const response = await axiosInstance.get("/brands"); // Adjust API endpoint
//       setBrands(response.data);
//     } catch (err) {
//       setBrandsError(err.message || "Failed to fetch brands");
//     } finally {
//       setLoadingBrands(false);
//     }
//   };

//   const fetchBanners = async () => {
//     try {
//       const response = await axiosInstance.get("/banners"); // Adjust API endpoint
//       setBanners(response.data[0]);
//     } catch (err) {
//       setBannersError(err.message || "Failed to fetch brands");
//     } finally {
//       setLoadingBanners(false);
//     }
//   };



//   return (
//     <>
//       <section className="relative overflow-hidden md:h-[70vh] h-[50vh]">
//         <div className="z-10">
//           {/* <video
//             className="w-full md:h-[100vh] hidden md:block object-fill md:object-cover"
//             autoPlay
//             loop
//             muted
//           >
//             <source src={HeroVideo2} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video> */}
//           <img
//             className=" md:h-[70vh] h-[50vh] w-full"
//             src={banners?.imageUrl? banners?.imageUrl : mobileBanner}
//             alt=""
//           />
//           {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
//           {/* <BannerCarousel /> */}
//           <div className="block absolute md:top-[30%] top-[25%] right-4 animate-bounce">
//             <h2
//               style={{ stroke: "1px solid black" }}
//               className="md:text-4xl text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black drop-shadow-lg transition duration-500 ease-in-out transform hover:scale-110"
//             >
//               SEASON OFFER
//             </h2>
//             <p className="md:text-lg text-sm text-red-700 animate-pulse mt-2 font-semibold drop-shadow-md">
//               Ending Soon
//             </p>
//           </div>
//         </div>

//         {/* Brands Marquee Section */}
//         <div className="absolute bottom-0 left-0 right-0 bg-transparent pt-4 overflow-hidden z-20 home-gradient">
//           <div className="h-full w-full inset-y-full hover:inset-y-0">
//             <div className="absolute bottom-0 left-0 h-full w-full z-10 opacity-0 transition-all ease-in-out duration-300 hover:opacity-100">
//               <div className="absolute bottom-0 left-0 h-[100%] w-full flex justify-center items-center z-30 text-white bg-gradient-to-t from-blue-200 to-transparent bg-opacity-30 backdrop-blur-sm">
//                 <button
//                   onClick={() => scrollToClient(ourBrandSection)}
//                   className="text-lg hover:text-xl text-blue-900 transition-all duration-300 ease-in-out"
//                 >
//                   Checkout our brands
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="w-full overflow-hidden whitespace-nowrap pb-4">
//             {loadingBrands ? (
//               <div className="flex justify-center py-4">
//                 <p>Loading brands...</p>
//               </div>
//             ) : brandsError ? (
//               <div className="flex justify-center py-4 text-red-500">
//                 <p>{brandsError}</p>
//               </div>
//             ) : brands.length > 0 ? (
//               <Marquee>
//                 {brands.map((brand) => (
//                   <img
//                     key={brand?.brandId}
//                     src={brand?.images[0]}
//                     alt={`${brand?.name} Logo`}
//                     className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "https://via.placeholder.com/150?text=Brand+Logo";
//                     }}
//                   />
//                 ))}
//               </Marquee>
//             ) : (
//               <div className="flex justify-center py-4">
//                 <p>No brands available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       <section>
//         <Services />
//       </section>

//       <section className="className=md:mt-16">
//         <Clients />
//       </section>

//       <section className="md:mt-16">
//         <ProductsSection />
//       </section>

//       <section className="bg-blue-50 w-full p-10">
//         <h1 className="text-center md:text-3xl text-xl font-bold">
//           All Products
//         </h1>
//         <div className="w-24 h-1.5  bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2"></div>
//         <ProductList products={products} />
//       </section>

//       <section className="md:mt-16">
//         <ProductsForRQ products={products} />
//       </section>

//       <section className="md:mt-16" ref={ourBrandSection}>
//         <OurBrand />
//       </section>

      

//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import Marquee from "react-fast-marquee";
import Clients from "./Clients";
import Services from "./Services";
import ProductsSection from "./ProductsSection";
import OurBrand from "../Components/widget/OurBrand";
import ProductList from "../Components/listing/ProductListing";
import useProductStore from "../Context/ProductContext";
import ProductsForRQ from "../Components/listing/ProductsForRQ";
import mobileBanner from "../assets/mobileBanner.jpg";

const Home = () => {
  // State management
  const ourBrandSection = useRef(null);
  const { products, fetchProducts } = useProductStore();
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [brandsError, setBrandsError] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef(null);
  const ourProductsSection = useRef(null);

  // Fetch data
  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchBanners();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    resetTimeout();
    if (banners.length > 1) {
      timeoutRef.current = setTimeout(() => {
        goToNext();
      }, 5000);
    }
    return () => resetTimeout();
  }, [currentBannerIndex, banners]);

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get("/brands");
      setBrands(response.data);
    } catch (err) {
      setBrandsError(err.message || "Failed to fetch brands");
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get("/banners");
      setBanners(response.data);
    } catch (err) {
      console.error("Failed to fetch banners", err);
    } finally {
      setLoadingBanners(false);
    }
  };

  // Carousel controls
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentBannerIndex((prev) => 
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentBannerIndex((prev) => 
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentBannerIndex ? 1 : -1);
    setCurrentBannerIndex(index);
  };

  const scrollToClient = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Banner Carousel Section */}
      <section className="relative md:h-[70vh] h-[22vh] w-full overflow-hidden">
      {banners.length > 0 ? (
          <div className="relative w-full h-full bg-blue-300">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentBannerIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full"
              >
                <img
                  src={banners[currentBannerIndex]?.imageUrl || "http://192.168.1.14:8080/uploads/1d5a0fd4-7abb-4eb3-89f1-5936248d020f_WhatsApp%20Image%202025-05-14%20at%203.29.37%20PM.webp"}
                  alt={`Banner ${currentBannerIndex + 1}`}
                  className="w-full h-[100%]   "
                />
                
                {/* Banner Content Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent flex items-center">
                  <div className=" mx-auto md:px-6 text-blue-800  md:ml-20 ml-2 w-full flex flex-col justify-center md:justify-start items-center md:items-start ">
                    <motion.h2 
                      variants={textVariants}
                      // initial="hidden"
                      // animate="visible"
                      className="text-3xl text-center md:text-5xl font-bold mb-4 drop-shadow-lg  [-webkit-text-stroke:0.5px_white] "
                    >
    {banners[currentBannerIndex]?.title || "Seasonal Sale"}
                    </motion.h2>
                    <motion.p 
                      variants={textVariants}
                      // initial="hidden"
                      // animate="visible"
                      // transition={{ delay: 0.2 }}
                      className="text-xl md:text-2xl font-semibold mb-8 max-w-lg drop-shadow-md [-webkit-text-stroke:0.2px_white]"
                    >
                      {banners[currentBannerIndex]?.subtitle || "Limited time offers"}
                    </motion.p>
                    <motion.button
                      variants={textVariants}
                      // initial="hidden"
                      // animate="visible"
                      // transition={{ delay: 0.4 }}
                      className="px-4 py-2  bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border border-white"
                      onClick={() => scrollToClient(ourProductsSection)}
                    >
                      Shop Now
                    </motion.button>
                  </div>
                </div> */}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute hidden md:flex left-6 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-700  text-gray-800 p-3 rounded-full z-20 shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous banner"
            >
              <FaChevronLeft size={24} color="white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute hidden md:flex right-6 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-700  text-gray-800 p-3 rounded-full z-20 shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next banner"
            >
              <FaChevronRight size={24} color="white" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentBannerIndex
                      ? "bg-blue-700 w-8 scale-125"
                      : "bg-blue-700/50 "
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{backgroundImage: "uri()" }} className="w-full h-full bg-blue-400 flex items-center justify-center">
            <div className="text-white text-center p-6">
              <h2 className="text-4xl font-bold mb-4">Welcome to Rent Ro</h2>
              <p className="text-xl mb-6">Discover amazing products and deals</p>
              <button onClick={() => scrollToClient(ourProductsSection)} className="px-6 py-2 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                Explore Now
              </button>
            </div>
          </div>
        )}

        {/* Brands Marquee Section */}
       
      </section>

      {/* Rest of the sections */}
         <section className="md:mt-16" ref={ourBrandSection}>
        <OurBrand />
      </section>

      <section>
        <Services />
      </section>

     

      <section className="md:mt-16">
        <ProductsSection />
      </section>

      <section className="bg-blue-50 w-full p-10" ref ={ourProductsSection}>
        <h1 className="text-center md:text-3xl text-xl font-bold">
          All Products
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2"></div>
        <ProductList products={products} />
      </section>

      <section className="md:mt-16">
        <ProductsForRQ products={products} />
      </section>

      <section className="md:mt-16">
        <Clients />
      </section>
    </div>
  );
};

export default Home;