import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../index.css";
import { useLocation } from "react-router-dom";
import OceanScene from "../Components/widget/OceanScene";
import IMG1 from "../assets/Services/IMG1.png";
import IMG2 from "../assets/Services/IMG2.png";
import IMG3 from "../assets/Services/IMG3.png";
import IMG4 from "../assets/Services/IMG4.png";
import IMG5 from "../assets/Services/IMG5.png";
import IMG6 from "../assets/Services/IMG6.png";
import IMG7 from "../assets/Services/IMG7.png";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
const Services = () => {
  const swiperRef = useRef(null);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

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

  const toggleDescription = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsDesktop(window.innerWidth >= 1024);

      if (swiperRef.current) {
        swiperRef.current.swiper.update();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {location.pathname === "/services" ? <OceanScene /> : ""}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {location.pathname === "/" && (
            <h2 className="text-3xl text-blue-800 md:text-4xl font-bold text-center mb-4">
              Our Services
            </h2>
          )}
          <h4 className="text-center md:text-xl text-gray-500 mb-8">
            Comprehensive Water Solutions, Seamless Monthly Water Filter Rentals
            and Expert Maintenance Services for Pure, Hassle-free Hydration
          </h4>

          <div className="relative w-full  ">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3.5 },
              }}
              navigation={false}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full"
            >
              {services.map((service, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => toggleDescription(index)}
                >
                  <div className="border py-5 rounded-xl relative group overflow-hidden bg-white transition-all duration-300">
                    <img
                      className="h-80 w-full object-contain rounded-md transition-transform duration-300 ease-in-out group-hover:scale-90"
                      src={service.Image}
                      alt={service.title}
                    />
                    <div
                      className={`absolute inset-x-0 bottom-0 bg-blue-500/50 flex justify-center items-center flex-col text-white h-full text-center px-6 py-6 transition-all duration-500 ease-in-out ${
                        isMobile
                          ? activeIndex === index
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                          : "translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <p className="mt-2 text-sm">{service.description}</p>
                    </div>
                    <h3
                      className={`relative bottom-4 left-1/2 transform -translate-x-1/2 text-blue-950 text-center text-lg font-semibold transition-opacity duration-300 ease-in-out ${
                        isMobile
                          ? activeIndex === index
                            ? "opacity-0"
                            : "opacity-100"
                          : "opacity-100 group-hover:opacity-0"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {isDesktop && (
              <>
                <button
                  className="hidden border-2 border-white custom-next liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 right-2 z-40 transform -translate-y-1/2"
                  onClick={handleNext}
                >
                  <span className="relative text-xl font-semibold z-10">
                  <GrNext/>
                  </span>
                  <div className="liquid"></div>
                </button>

                <button
                  className="hidden border-2 border-white custom-prev liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 left-2 z-40 transform -translate-y-1/2"
                  onClick={handlePrev}
                >
                  <span className="relative text-xl font-semibold z-10">
                    <GrPrevious/>
                  </span>
                  <div className="liquid"></div>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* {location.pathname === "/services" && <BottomNav />} */}
      {/* <ScrollToTopButton /> */}
    </>
  );
};

export default Services;
