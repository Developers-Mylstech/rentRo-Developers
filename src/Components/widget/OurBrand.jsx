// // import React from 'react'
// // import Aquaguard from "../../assets/OurBrand/Aquaguard.png";
// // import Aquapro from "../../assets/OurBrand/Aquapro.png";
// // import Bluewater from "../../assets/OurBrand/Bluewater.png";
// // import Culligan from "../../assets/OurBrand/Culligan.png";
// // import Kent from "../../assets/OurBrand/Kent.png";
// // import WaterLogic from "../../assets/OurBrand/WaterLogic.png";
// // import { Swiper, SwiperSlide } from "swiper/react";


// // function OurBrand() {
// //     const brands = [
// //       { id: 1, name: "Blue Water", image: Bluewater },
// //       { id: 2, name: "Aqua Pro", image: Aquapro },
// //       { id: 3, name: "Culligan", image: Culligan },
// //       { id: 4, name: "Kent Water", image: Kent },
// //       { id: 5, name: "Water Logic", image: WaterLogic },
// //       { id: 6, name: "Aquaguard", image: Aquaguard },
// //     ];
// //   return (
// //     <div className='my-12'>
// //          <h2 className="text-center text-2xl font-bold my-8 text-blue-800">Our Brands</h2>
// //       <Swiper
// //         spaceBetween={30}
// //         slidesPerView={5}
// //         loop={true}
// //         autoplay={{ delay: 3000, disableOnInteraction: false }}
// //         breakpoints={{
// //           640: { slidesPerView: 2 },
// //           768: { slidesPerView: 3 },
// //           1024: { slidesPerView: 4 },
// //           1280: { slidesPerView: 5 },
// //         }}
// //         className="w-full relative"
// //       >
// //         {brands.map((brand) => (
// //           <SwiperSlide
// //             key={brand.id}
// //             className="flex justify-center items-center"
// //           >
// //             <img src={brand.image} alt={brand.name} className="h-12" />
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </div>
// //   )
// // }

// // export default OurBrand

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/swiper-bundle.min.css";
// import Aquaguard from "../../assets/OurBrand/Aquaguard.png";
// import Aquapro from "../../assets/OurBrand/Aquapro.png";
// import Bluewater from "../../assets/OurBrand/Bluewater.png";
// import Culligan from "../../assets/OurBrand/Culligan.png";
// import Kent from "../../assets/OurBrand/Kent.png";
// import WaterLogic from "../../assets/OurBrand/WaterLogic.png";

// function OurBrand() {
//   const brands = [
//     { id: 1, name: "Blue Water", image: Bluewater },
//     { id: 2, name: "Aqua Pro", image: Aquapro },
//     { id: 3, name: "Culligan", image: Culligan },
//     { id: 4, name: "Kent Water", image: Kent },
//     { id: 5, name: "Water Logic", image: WaterLogic },
//     { id: 6, name: "Aquaguard", image: Aquaguard },
//   ];

//   return (
//     <div className="my-12">
//       <h2 className="text-center text-2xl font-bold my-8 text-blue-800">
//         Our Brands
//       </h2>
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={30}
//         slidesPerView={5}
//         loop={true}
//         // autoplay={{ delay: 2000, disableOnInteraction: false }}
//         autoplay={{ delay: 0, disableOnInteraction: false }}
//         speed={3000}
//         freeMode={true}
//         freeModeMomentum={false}
//         loopAdditionalSlides={5}
//         grabCursor={true}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//           1280: { slidesPerView: 5 },
//         }}
//         className="w-full relative"
//       >
//         {brands.map((brand) => (
//           <SwiperSlide key={brand.id} className="flex justify-center items-center">
//             <img src={brand.image} alt={brand.name} className="h-12" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default OurBrand;


import React from "react";
import Marquee from "react-fast-marquee";
import Aquaguard from "../../assets/OurBrand/Aquaguard.png";
import Aquapro from "../../assets/OurBrand/Aquapro.png";
import Bluewater from "../../assets/OurBrand/Bluewater.png";
import Culligan from "../../assets/OurBrand/Culligan.png";
import Kent from "../../assets/OurBrand/Kent.png";
import WaterLogic from "../../assets/OurBrand/WaterLogic.png";

function OurBrand() {
  const brands = [
    { id: 1, name: "Blue Water", image: Bluewater },
    { id: 2, name: "Aqua Pro", image: Aquapro },
    { id: 3, name: "Culligan", image: Culligan },
    { id: 4, name: "Kent Water", image: Kent },
    { id: 5, name: "Water Logic", image: WaterLogic },
    { id: 6, name: "Aquaguard", image: Aquaguard },
  ];

  return (
    <div className="my-12">
      <h2 className="text-center text-2xl font-bold my-8 mb-10 text-blue-800">
        Our Brands
      </h2>
      <div className="w-full overflow-hidden whitespace-nowrap pb-4">
        <Marquee 
          speed={50} 
          gradient={false} 
          pauseOnHover={true} 
          play={true} 
          direction="left"
          className="cursor-grab active:cursor-grabbing"
        >
          {brands.map((brand) => (
            <img
              key={brand.id}
              src={brand.image}
              alt={brand.name}
              className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain cursor-pointer"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default OurBrand;










// import React, { useRef, useState, useEffect } from "react";
// import Aquaguard from "../../assets/OurBrand/Aquaguard.png";
// import Aquapro from "../../assets/OurBrand/Aquapro.png";
// import Bluewater from "../../assets/OurBrand/Bluewater.png";
// import Culligan from "../../assets/OurBrand/Culligan.png";
// import Kent from "../../assets/OurBrand/Kent.png";
// import WaterLogic from "../../assets/OurBrand/WaterLogic.png";

// function OurBrand() {
//   const brands = [
//     { id: 1, name: "Blue Water", image: Bluewater },
//     { id: 2, name: "Aqua Pro", image: Aquapro },
//     { id: 3, name: "Culligan", image: Culligan },
//     { id: 4, name: "Kent Water", image: Kent },
//     { id: 5, name: "Water Logic", image: WaterLogic },
//     { id: 6, name: "Aquaguard", image: Aquaguard },
//   ];

//   const marqueeRef = useRef(null);
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);
//   const velocity = useRef(0);
//   const animationFrame = useRef(null);

//   useEffect(() => {
//     const scrollMarquee = () => {
//       if (!isDragging.current && marqueeRef.current) {
//         marqueeRef.current.scrollLeft += 1; // Adjust speed
//       }
//       animationFrame.current = requestAnimationFrame(scrollMarquee);
//     };

//     animationFrame.current = requestAnimationFrame(scrollMarquee);
//     return () => cancelAnimationFrame(animationFrame.current);
//   }, []);

//   const handleMouseDown = (e) => {
//     isDragging.current = true;
//     startX.current = e.pageX - marqueeRef.current.offsetLeft;
//     scrollLeft.current = marqueeRef.current.scrollLeft;
//     velocity.current = 0;
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging.current) return;
//     e.preventDefault();
//     const x = e.pageX - marqueeRef.current.offsetLeft;
//     const walk = (x - startX.current) * 1.5; // Adjust sensitivity
//     marqueeRef.current.scrollLeft = scrollLeft.current - walk;
//     velocity.current = walk; // Capture velocity
//   };

//   const handleMouseUp = () => {
//     isDragging.current = false;
//     smoothInertiaScroll();
//   };

//   const smoothInertiaScroll = () => {
//     if (Math.abs(velocity.current) < 0.1) return;
//     velocity.current *= 0.95; // Slow down over time
//     marqueeRef.current.scrollLeft -= velocity.current;
//     requestAnimationFrame(smoothInertiaScroll);
//   };

//   return (
//     <div className="my-12">
//       <h2 className="text-center text-2xl font-bold my-8 text-blue-800">
//         Our Brands
//       </h2>
//       <div
//         ref={marqueeRef}
//         className="w-full overflow-hidden whitespace-nowrap cursor-grab active:cursor-grabbing flex"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseUp}
//         onMouseUp={handleMouseUp}
//       >
//         {[...brands, ...brands].map((brand, index) => (
//           <img
//             key={index}
//             src={brand.image}
//             alt={brand.name}
//             className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default OurBrand;

