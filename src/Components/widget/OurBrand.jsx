import React from 'react'
import Aquaguard from "../../assets/OurBrand/Aquaguard.png";
import Aquapro from "../../assets/OurBrand/Aquapro.png";
import Bluewater from "../../assets/OurBrand/Bluewater.png";
import Culligan from "../../assets/OurBrand/Culligan.png";
import Kent from "../../assets/OurBrand/Kent.png";
import WaterLogic from "../../assets/OurBrand/WaterLogic.png";
import { Swiper, SwiperSlide } from "swiper/react";


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
    <div className='my-12'>
         <h2 className="text-center text-2xl font-bold my-8 text-blue-800">Our Brands</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full relative"
      >
        {brands.map((brand) => (
          <SwiperSlide
            key={brand.id}
            className="flex justify-center items-center"
          >
            <img src={brand.image} alt={brand.name} className="h-12" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default OurBrand