// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Clients from "./Clients";
// import Services from "./Services";
// import ProductsSection from "./ProductsSection";
// import HeroVideo2 from "../assets/HeroVideo21.mp4";
// import Aquaguard from "../assets/OurBrand/Aquaguard.png";
// import Aquapro from "../assets/OurBrand/Aquapro.png";
// import Bluewater from "../assets/OurBrand/Bluewater.png";
// import Culligan from "../assets/OurBrand/Culligan.png";
// import Kent from "../assets/OurBrand/Kent.png";
// import WaterLogic from "../assets/OurBrand/WaterLogic.png";
// import Marquee from "react-fast-marquee";
// import { useRef } from "react";
// import OurBrand from "../Components/widget/OurBrand.jsx";
// import BannerCarousel from "../Components/widget/BannerCarousel.jsx";
// import mobileBanner from "../assets/mobileBanner.jpg";
// import ProductList from "../Components/listing/ProductListing.jsx";
// import useProductStore from "../Context/ProductContext.js";




// const Home = () => {


//   const ourBrandSection = useRef(null);

//   const  {products,fetchProducts} = useProductStore()


//   console.log(products,"new product")

//   const scrollToClient = (elementRef) => {
//     window.scrollTo({
//       top: elementRef.current.offsetTop,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   return (
//     <>
//       <section className="relative overflow-hidden mh-[100vh] h-max-[100vh] ">
//         <div className="z-10">
//         <video
//             className="w-full md:h-[100vh] hidden md:block object-fill md:object-cover"
//             autoPlay
//             loop
//             muted
//           >
//             <source src={HeroVideo2} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <img
//             className="md:hidden block h-[40vh] w-full"
//             src={mobileBanner}
//             alt=""
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//           <BannerCarousel />
//           <div className="block absolute md:top-[30%]  top-[25%] right-4 animate-bounce">
//             <h2 style={{stroke: '1px solid black'}}
//               className="md:text-4xl  text-xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black 
//               drop-shadow-lg transition duration-500 ease-in-out transform hover:scale-110 "
//             >
//               SEASON OFFER

//             </h2>
         
//             <p className="md:text-lg text-sm text-red-700 animate-pulse mt-2 font-semibold drop-shadow-md">
//               Ending Soon
//             </p>
//           </div>
//         </div>
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

//           <div className="w-full overflow-hidden whitespace-nowrap pb-4 ">
//             <Marquee>
//               <img
//                 src={Aquaguard}
//                 alt="Aquaguard Logo"
//                 className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//               />
//               <img
//                 src={Aquapro}
//                 alt="Aquapro Logo"
//                 className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//               />
//               <img
//                 src={Bluewater}
//                 alt="Bluewater Logo"
//                 className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//               />
//               <img
//                 src={Culligan}
//                 alt="Culligan Logo"
//                 className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//               />
//               <img
//                 src={Kent}
//                 alt="Kent Logo"
//                 className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//               />
//               <img
//                 src={WaterLogic}
//                 alt="WaterLogic Logo"
//                 className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//               />
//             </Marquee>
//           </div>
//         </div>
//       </section>

//       <section className="">
//         <Services />
//       </section>


//       <section className=" className=md:mt-16">
//         <Clients />
//       </section>
//       <section  className="md:mt-16">
//         <ProductsSection />
//       </section>
//       <section className="bg-blue-50 w-full  p-10">
//         <h1 className="
//         text-center text-2xl md:text-3xl  font-bold ">All Products</h1>
//          <div className="w-20 h-1 bg-blue-500 mx-auto mt-2"></div>
//         <ProductList products={products}  />
//       </section>
//       <section className="md:mt-16" ref={ourBrandSection}>
//         <OurBrand />
//       </section>

      
//     </>
//   );
// };

// export default Home;





import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Adjust import path
import Clients from "./Clients";
import Services from "./Services";
import ProductsSection from "./ProductsSection";
import HeroVideo2 from "../assets/HeroVideo21.mp4";
import Marquee from "react-fast-marquee";
import OurBrand from "../Components/widget/OurBrand.jsx";
import BannerCarousel from "../Components/widget/BannerCarousel.jsx";
import mobileBanner from "../assets/mobileBanner.jpg";
import ProductList from "../Components/listing/ProductListing.jsx";
import useProductStore from "../Context/ProductContext.js";
import ProductsForRQ from "../Components/listing/ProductsForRQ.jsx";

const Home = () => {
  const ourBrandSection = useRef(null);
  const { products, fetchProducts } = useProductStore();
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [brandsError, setBrandsError] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [bannersError, setBannersError] = useState(null);

  const scrollToClient = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchBrands();
    fetchBanners();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get("/brands"); // Adjust API endpoint
      setBrands(response.data);
    } catch (err) {
      setBrandsError(err.message || "Failed to fetch brands");
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get("/banners"); // Adjust API endpoint
      setBanners(response.data[0]);
    } catch (err) {
      setBannersError(err.message || "Failed to fetch brands");
    } finally {
      setLoadingBanners(false);
    }
  };



  return (
    <>
      <section className="relative overflow-hidden md:h-[70vh] h-[50vh]">
        <div className="z-10">
          {/* <video
            className="w-full md:h-[100vh] hidden md:block object-fill md:object-cover"
            autoPlay
            loop
            muted
          >
            <source src={HeroVideo2} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <img
            className=" md:h-[70vh] h-[50vh] w-full"
            src={banners?.imageUrl? banners?.imageUrl : mobileBanner}
            alt=""
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
          {/* <BannerCarousel /> */}
          <div className="block absolute md:top-[30%] top-[25%] right-4 animate-bounce">
            <h2
              style={{ stroke: "1px solid black" }}
              className="md:text-4xl text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black drop-shadow-lg transition duration-500 ease-in-out transform hover:scale-110"
            >
              SEASON OFFER
            </h2>
            <p className="md:text-lg text-sm text-red-700 animate-pulse mt-2 font-semibold drop-shadow-md">
              Ending Soon
            </p>
          </div>
        </div>

        {/* Brands Marquee Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-transparent pt-4 overflow-hidden z-20 home-gradient">
          <div className="h-full w-full inset-y-full hover:inset-y-0">
            <div className="absolute bottom-0 left-0 h-full w-full z-10 opacity-0 transition-all ease-in-out duration-300 hover:opacity-100">
              <div className="absolute bottom-0 left-0 h-[100%] w-full flex justify-center items-center z-30 text-white bg-gradient-to-t from-blue-200 to-transparent bg-opacity-30 backdrop-blur-sm">
                <button
                  onClick={() => scrollToClient(ourBrandSection)}
                  className="text-lg hover:text-xl text-blue-900 transition-all duration-300 ease-in-out"
                >
                  Checkout our brands
                </button>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden whitespace-nowrap pb-4">
            {loadingBrands ? (
              <div className="flex justify-center py-4">
                <p>Loading brands...</p>
              </div>
            ) : brandsError ? (
              <div className="flex justify-center py-4 text-red-500">
                <p>{brandsError}</p>
              </div>
            ) : brands.length > 0 ? (
              <Marquee>
                {brands.map((brand) => (
                  <img
                    key={brand?.brandId}
                    src={brand?.images[0]}
                    alt={`${brand?.name} Logo`}
                    className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=Brand+Logo";
                    }}
                  />
                ))}
              </Marquee>
            ) : (
              <div className="flex justify-center py-4">
                <p>No brands available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <Services />
      </section>

      <section className="className=md:mt-16">
        <Clients />
      </section>

      <section className="md:mt-16">
        <ProductsSection />
      </section>

      <section className="bg-blue-50 w-full p-10">
        <h1 className="text-center md:text-3xl text-xl font-bold">
          All Products
        </h1>
        <div className="w-24 h-1.5  bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2"></div>
        <ProductList products={products} />
      </section>

      <section className="md:mt-16">
        <ProductsForRQ products={products} />
      </section>

      <section className="md:mt-16" ref={ourBrandSection}>
        <OurBrand />
      </section>

      

    </>
  );
};

export default Home;
