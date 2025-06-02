

// import React, { useEffect, useState, useRef } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import axiosInstance from "../utils/axiosInstance";
// import Marquee from "react-fast-marquee";
// import Clients from "./Clients";
// import Services from "./Services";
// import ProductsSection from "./ProductsSection";
// import OurBrand from "../Components/widget/OurBrand";
// import ProductList from "../Components/listing/ProductListing";
// import useProductStore from "../Context/ProductContext";
// import ProductsForRQ from "../Components/listing/ProductsForRQ";
// import mobileBanner from "../assets/mobileBanner.jpg";

// const Home = () => {
//   // State management
//   const ourBrandSection = useRef(null);
//   const { products, fetchProducts } = useProductStore();
//   const [brands, setBrands] = useState([]);
//   const [loadingBrands, setLoadingBrands] = useState(true);
//   const [brandsError, setBrandsError] = useState(null);
//   const [banners, setBanners] = useState([]);
//   const [loadingBanners, setLoadingBanners] = useState(true);
//   const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const timeoutRef = useRef(null);
//   const ourProductsSection = useRef(null);

//   // Fetch data
//   useEffect(() => {
//     fetchProducts();
//     fetchBrands();
//     fetchBanners();
//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   // Auto-rotate banners
//   useEffect(() => {
//     resetTimeout();
//     if (banners.length > 1) {
//       timeoutRef.current = setTimeout(() => {
//         goToNext();
//       }, 5000);
//     }
//     return () => resetTimeout();
//   }, [currentBannerIndex, banners]);

//   const fetchBrands = async () => {
//     try {
//       const response = await axiosInstance.get("/brands");
//       setBrands(response.data);
//     } catch (err) {
//       setBrandsError(err.message || "Failed to fetch brands");
//     } finally {
//       setLoadingBrands(false);
//     }
//   };

//   const fetchBanners = async () => {
//     try {
//       const response = await axiosInstance.get("/banners");
//       setBanners(response.data);
//     } catch (err) {
//       console.error("Failed to fetch banners", err);
//     } finally {
//       setLoadingBanners(false);
//     }
//   };

//   // Carousel controls
//   const resetTimeout = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//   };

//   const goToNext = () => {
//     setDirection(1);
//     setCurrentBannerIndex((prev) => 
//       prev === banners.length - 1 ? 0 : prev + 1
//     );
//   };

//   const goToPrev = () => {
//     setDirection(-1);
//     setCurrentBannerIndex((prev) => 
//       prev === 0 ? banners.length - 1 : prev - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setDirection(index > currentBannerIndex ? 1 : -1);
//     setCurrentBannerIndex(index);
//   };

//   const scrollToClient = (elementRef) => {
//     window.scrollTo({
//       top: elementRef.current.offsetTop,
//       behavior: "smooth",
//     });
//   };

//   // Animation variants
//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? "100%" : "-100%",
//     }),
//     center: {
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30
//       }
//     },
//     exit: (direction) => ({
//       x: direction < 0 ? "100%" : "-100%",
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30
//       }
//     })
//   };

//   const textVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { duration: 0.6 }
//     }
//   };

//   return (
//     <div className="overflow-x-hidden">
//       {/* Banner Carousel Section */}
//       <section className="relative md:h-[60vh] h-[22vh] w-full overflow-hidden">
//       {banners.length > 0 ? (
//           <div className="relative w-full h-full bg-blue-300">
//             <AnimatePresence custom={direction} initial={false}>
//               <motion.div
//                 key={currentBannerIndex}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 className="absolute w-full h-full"
//               >
//                 <img
//                   src={banners[currentBannerIndex]?.imageUrl || "http://192.168.1.14:8080/uploads/1d5a0fd4-7abb-4eb3-89f1-5936248d020f_WhatsApp%20Image%202025-05-14%20at%203.29.37%20PM.webp"}
//                   alt={`Banner ${currentBannerIndex + 1}`}
//                   className="w-full h-[100%]   "
//                 />
                
               
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Arrows */}
//             <button
//               onClick={goToPrev}
//               className="absolute hidden md:flex left-6 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-700  text-gray-800 p-3 rounded-full z-20 shadow-xl transition-all duration-300 hover:scale-110"
//               aria-label="Previous banner"
//             >
//               <FaChevronLeft size={24} color="white" />
//             </button>
//             <button
//               onClick={goToNext}
//               className="absolute hidden md:flex right-6 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-700  text-gray-800 p-3 rounded-full z-20 shadow-xl transition-all duration-300 hover:scale-110"
//               aria-label="Next banner"
//             >
//               <FaChevronRight size={24} color="white" />
//             </button>

//             {/* Indicators */}
//             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
//               {banners.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentBannerIndex
//                       ? "bg-blue-700 w-8 scale-125"
//                       : "bg-blue-700/50 "
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div style={{backgroundImage: "uri()" }} className="w-full h-full bg-blue-400 flex items-center justify-center">
//             <div className="text-white text-center p-6">
//               <h2 className="text-4xl font-bold mb-4">Welcome to Rent Ro</h2>
//               <p className="text-xl mb-6">Discover amazing products and deals</p>
//               <button onClick={() => scrollToClient(ourProductsSection)} className="px-6 py-2 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
//                 Explore Now
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Brands Marquee Section */}
       
//       </section>

//       {/* Rest of the sections */}
//          <section className="md:mt-12" ref={ourBrandSection}>
//         <OurBrand />
//       </section>

//       <section>
//         <Services />
//       </section>

     

//       <section className="md:mt-12">
//         <ProductsSection />
//       </section>

//       <section className="bg-blue-50 w-full p-10" ref ={ourProductsSection}>
//         <h1 className="text-center md:text-3xl text-xl font-bold">
//           All Products
//         </h1>
//         <div className="w-24 h-1.5 bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2"></div>
//         <ProductList products={products} />
//       </section>

//       <section className="md:mt-12">
//         <ProductsForRQ products={products} />
//       </section>

//       <section className="md:mt-12">
//         <Clients />
//       </section>
//     </div>
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
import useUserStore from "../Context/UserContext";



let bannerCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes cache
};

const Home = () => {

  const ourBrandSection = useRef(null);
  const { products, fetchProducts } = useProductStore();
  const { fetchUser } = useUserStore();
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [brandsError, setBrandsError] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef(null);
  const ourProductsSection = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchUser()
    
   
    if (!bannerCache.data || Date.now() - bannerCache.timestamp > bannerCache.CACHE_DURATION) {
      fetchBanners();
    } else {
      setBanners(bannerCache.data);
      setLoadingBanners(false);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);


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

      bannerCache = {
        ...bannerCache,
        data: response.data,
        timestamp: Date.now()
      };
    } catch (err) {
      console.error("Failed to fetch banners", err);
    } finally {
      setLoadingBanners(false);
    }
  };


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

      <section className="relative w-full overflow-hidden">

        <div className="md:h-[60vh] h-[25vh] sm:h-[50vh] w-full">
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

                  <picture>
                    {/* Mobile-first approach */}
                    <source 
                      media="(max-width: 639px)" 
                      srcSet={banners[currentBannerIndex]?.mobileImageUrl || banners[currentBannerIndex]?.imageUrl || "http://192.168.1.14:8080/uploads/1d5a0fd4-7abb-4eb3-89f1-5936248d020f_WhatsApp%20Image%202025-05-14%20at%203.29.37%20PM.webp"}
                    />
                    {/* Tablet */}
                    <source 
                      media="(max-width: 1023px)" 
                      srcSet={banners[currentBannerIndex]?.tabletImageUrl || banners[currentBannerIndex]?.imageUrl || "http://192.168.1.14:8080/uploads/1d5a0fd4-7abb-4eb3-89f1-5936248d020f_WhatsApp%20Image%202025-05-14%20at%203.29.37%20PM.webp"}
                    />
                    {/* Desktop */}
                    <img
                      src={banners[currentBannerIndex]?.imageUrl || "http://192.168.1.14:8080/uploads/1d5a0fd4-7abb-4eb3-89f1-5936248d020f_WhatsApp%20Image%202025-05-14%20at%203.29.37%20PM.webp"}
                      alt={`Banner ${currentBannerIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Responsive sizing */}
              <button
                onClick={goToPrev}
                className=" hidden sm:block absolute  left-2 md:left-6 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-700 text-gray-800 p-2 md:p-3 rounded-full z-20 shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Previous banner"
              >
                <FaChevronLeft className="text-sm md:text-base" color="white" />
              </button>
              <button
                onClick={goToNext}
                className="hidden sm:block absolute  right-2 md:right-6 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-700 text-gray-800 p-2 md:p-3 rounded-full z-20 shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Next banner"
              >
                <FaChevronRight className="text-sm md:text-base" color="white" />
              </button>

              {/* Indicators - Responsive positioning */}
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentBannerIndex
                        ? "bg-blue-700 md:w-8 scale-125"
                        : "bg-blue-700/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-blue-400 flex items-center justify-center">
              <div className="text-white text-center p-6">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Welcome to Rent Ro</h2>
                <p className="text-base md:text-xl mb-6">Discover amazing products and deals</p>
                <button 
                  onClick={() => scrollToClient(ourProductsSection)} 
                  className="px-4 py-1 md:px-6 md:py-2 bg-white text-blue-600 rounded-full font-bold shadow-lg hover:scale-105 transition-transform text-sm md:text-base"
                >
                  Explore Now
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Rest of the sections */}
      <section className="md:mt-12" ref={ourBrandSection}>
        <OurBrand />
      </section>

      <section>
        <Services />
      </section>

      <section className="md:mt-12">
        <ProductsSection />
      </section>

      <section className="bg-blue-50 w-full p-4 md:p-10" ref={ourProductsSection}>
        <h1 className="text-center md:text-3xl text-xl font-bold">
          All Products
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2"></div>
        <ProductList products={products} />
      </section>

      <section className="md:mt-12">
        <ProductsForRQ products={products} />
      </section>

      <section className="md:mt-12">
        <Clients />
      </section>
    </div>
  );
};

export default Home;