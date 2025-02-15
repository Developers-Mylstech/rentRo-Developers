// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper";
// import { useRef } from "react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "../index.css";
// import roLogo1 from "../assets/roLogo1.png";
// import roLogo2 from "../assets/roLogo2.png";
// import roLogo3 from "../assets/roLogo3.png";
// import roLogo4 from "../assets/roLogo4.png";

// const BannerCarousel = () => {
//   const slides = [
//     {
//       image: roLogo1,
//       text: "Water Filters On Monthly Rent"
//     },
//     {
//       image: roLogo2,
//       text: "Advanced Filtration Technology"
//     },
//     {
//       image: roLogo3,
//       text: "Purity You Can Trust"
//     },
//     {
//       image: roLogo4,
//       text: "Safe and Clean Drinking Water"
//     }
//   ];
//   const swiperRef = useRef(null);

//   const handleNext = () => {
//     swiperRef.current.swiper.slideNext();
//   };

//   const handlePrev = () => {
//     swiperRef.current.swiper.slidePrev();
//   };

//   return (
//     <div className="absolute md:top-10 top-0 left-0 bottom-0 w-full h-full flex items-center justify-center">
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation={{
//           nextEl: ".custom-next",
//           prevEl: ".custom-prev"
//         }}
//         autoplay={{ delay: 4000 }}
//         loop
//         className="w-full md:w-[100%] lg:w-[100%] mt-10  text-white custom-swiper"
//         ref={swiperRef}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index} className="flex justify-start items-center ">
//             <div className="flex items-center justify-between w-full py-5 rounded-lg">
//               <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
//                 <img 
//                   src={slide.image} 
//                   alt="RO Logo" 
//                   className="h-56 md:h-96 lg:h-1/3 w-auto object-contain"
//                 />
//               </div>
//               <div className="w-full md:w-1/2 text-left">
//                 <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-blue-900">{slide.text}</h2>
//                 <p className="mt-2 text-sm md:text-lg lg:text-xl text-black">Your Trusted Partner for Reliable Water Filters and Services</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//         <button
//               className="hidden border-2 border-white custom-next liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 right-2 z-50 transform -translate-y-1/2"
//               onClick={handleNext}
//             >
//               <span className="relative text-xl font-semibold z-10">Next</span>
//               <div className="liquid"></div>
//             </button>

//             <button
//               className="hidden border-2 border-white custom-prev liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 left-2 z-40 transform -translate-y-1/2"
//               onClick={handlePrev}
//             >
//               <span className="relative text-xl font-semibold z-10">Prev</span>
//               <div className="liquid"></div>
//             </button>
//       </Swiper>
//     </div>
//   );
// };

// export default BannerCarousel;


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Navigation } from "swiper";  // Removed Navigation
import { useRef } from "react";
import "swiper/css";
import "../index.css";
import roLogo1 from "../assets/roLogo1.png";
import roLogo2 from "../assets/roLogo2.png";
import roLogo3 from "../assets/roLogo3.png";
import roLogo4 from "../assets/roLogo4.png";

const BannerCarousel = () => {
  const slides = [
    {
      image: roLogo1,
      text: "Water Filters On Monthly Rent"
    },
    {
      image: roLogo2,
      text: "Advanced Filtration Technology"
    },
    {
      image: roLogo3,
      text: "Purity You Can Trust"
    },
    {
      image: roLogo4,
      text: "Safe and Clean Drinking Water"
    }
  ];
  const swiperRef = useRef(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className="absolute md:top-10 top-0 left-0 bottom-0 w-full h-full flex items-center justify-center">
      <Swiper
        modules={[Navigation,Autoplay]}   // Removed Navigation Module
        autoplay={{ delay: 4000 }}
        loop={true}
        className="w-full md:w-[100%] lg:w-[100%] mt-10 text-white custom-swiper"
        ref={swiperRef}
        navigation={false}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-start items-center">
            <div className="flex items-center justify-between w-full py-5 rounded-lg">
              <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                <img 
                  src={slide.image} 
                  alt="RO Logo" 
                  className="h-64 md:h-96 lg:h-1/2 w-auto object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 text-left">
                
                <h2 className="text-2xl md:text-4xl lg:text-6xl  font-bold text-blue-900">{slide.text}</h2>
                <p className="mt-2 text-base md:text-xl lg:text-3xl text-black">Your Trusted Partner for Reliable Water Filters and Services</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        <button
          className="hidden border-2 border-white custom-next liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 right-2 z-50 transform -translate-y-1/2"
          onClick={handleNext}
        >
          <span className="relative text-xl font-semibold z-10">Next</span>
          <div className="liquid"></div>
        </button>

        <button
          className="hidden border-2 border-white custom-prev liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 left-2 z-40 transform -translate-y-1/2"
          onClick={handlePrev}
        >
          <span className="relative text-xl font-semibold z-10">Prev</span>
          <div className="liquid"></div>
        </button>
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
