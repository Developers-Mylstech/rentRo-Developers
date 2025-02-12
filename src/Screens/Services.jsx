import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../index.css";
import { useLocation } from "react-router-dom";
import OceanScene from "../Components/OceanScene";
import BottomNav from "../Components/BottomNav";
import IMG1 from "../assets/Services/IMG1.png";
import IMG2 from "../assets/Services/IMG2.png";
import IMG7 from "../assets/Services/IMG7.png";
import IMG4 from "../assets/Services/IMG4.png";
import IMG5 from "../assets/Services/IMG5.png";
import IMG3 from "../assets/Services/IMG3.png";
import IMG6 from "../assets/Services/IMG6.png";

const Services = () => {
  const swiperRef = useRef(null);
  const location = useLocation();
  const [hideDescription, setHideDescription] = useState(false);

  const services = [
    {
      title: "Comprehensive Water Solutions",
      description:
        "Seamless Monthly Water Filter Rentals and Expert Maintenance Services for Pure, Hassle-free Hydration",
      Image: IMG1,
    },
    {
      title: "Domestic Water Filters",
      description:
        "Our Domestic Water Filters Ensure Clean, Clear, and Safe Water for Your Daily Needs. Experience the Purity Within Every Drop.",
      Image: IMG2,
    },
    {
      title: "Commercial Water Filters",
      description:
        "Reliable Commercial Water Filters for Purity and Refreshment in Every Drop. Optimize Your Workplace Hydration with Confidence.",
      Image: IMG3,
    },
    {
      title: "Industrial Water Filters",
      description:
        "Unmatched Efficiency Ensures Pure and Clean Water. Elevate Your Industrial Hydration Standards for Uninterrupted Quality and Reliability.",
      Image: IMG7,
    },
    {
      title: "RO Services",
      description:
        "Ensuring Optimal Performance and Purity. Trust us for Reliable Maintenance, Extending the Lifespan of Your RO System.",
      Image: IMG4,
    },
    {
      title: "Water Coolers And Dispensers",
      description:
        "Stay refreshed effortlessly with our Water Coolers and Dispensers stylish, convenient, and always ready to provide instant, crisp hydration.",
      Image: IMG5,
    },
    {
      title: "Chillers And Tanks",
      description:
        "Experience optimal cooling with our Chillers and Tanks efficient, reliable, and tailored to ensure your beverages stay refreshingly cool every time.",
      Image: IMG6,
    },
  ];

  const toggleDescription = () => {
    setHideDescription(!hideDescription);
  };
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.update();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {location.pathname === "/services" ? <OceanScene /> : ""}
      <section className="bg-gray-100  py-12">
        <div className=" ">
          {location.pathname === "/" ? (
            // <h2 className="text-4xl font-extrabold text-center mb-4 animate-fade-in-up">
            //   Our Services
            // </h2>
            <h2 className="text-3xl md:text-5xl font-[ubik, sans-serif] font-bold text-blue-800 text-center mb-4 relative ">
              Our Services
            </h2>
          ) : (
            ""
          )}
          <h4 className="text-center md:text-xl font-[ubik, sans-serif] text-gray-600 mb-8 animate-fade-in-up">
            Comprehensive Water Solutions, Seamless Monthly Water Filter Rentals
            and Expert Maintenance Services for Pure, Hassle-free Hydration
          </h4>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1.4 },
              1024: { slidesPerView: 2.3 },
              1280: { slidesPerView: 3.5 },
            }}
            navigation={false}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full relative"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} onClick={toggleDescription}>
                <div className="group relative  shadow-xl my-10 border rounded-3xl bg-transparent overflow-hidden cursor-pointer transition-all transform hover:scale-90 hover:shadow-2xl">
                  <img
                    className="h-72 md:h-96 w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                    src={service.Image}
                    alt={service.title}
                  />
                  <h3
                    className={`text-xl text-blue-950 text-center py-4 font-bold animate-fade-in-up transition-opacity duration-200 ease-in-out ${
                      hideDescription ? "" : "group-hover:opacity-0"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <div
                    className={`absolute inset-x-0 bottom-[-20%] z-20 h-0 bg-blue-300/20 flex items-center justify-center text-center 
      transition-all duration-500 ease-in-out group-hover:h-[120%]`}
                  >
                    <div className="p-6 text-blue-950">
                      <h3 className="text-xl font-bold animate-fade-in-up">
                        {service.title}
                      </h3>
                      <p className="text-md italic mt-2 animate-fade-in-up">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <button
              className="hidden border-2 border-white custom-next liquid-button w-16 h-16  md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 right-2 z-50 transform -translate-y-1/2"
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
      </section>
      {location.pathname === "/services" ? <BottomNav /> : null}
    </>
  );
};

export default Services;
