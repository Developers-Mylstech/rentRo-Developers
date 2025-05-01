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
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import RequestQuotationBox from "../Components/form/RequestQuotationBox";
import { useNavigate } from "react-router-dom";
import useServiceStore from "../Context/ServiceContext";
const Services = () => {
  const swiperRef = useRef(null);
  const [openDailog, setOpenDailog] = useState(false)
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  const { services, loading, error, fetchServices } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Add this helper function to strip HTML tags
  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Add this navigation handler
  const handleServiceClick = (service) => {
    navigate(`/service/${service.title}`, { state: { service } });
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

  const ServiceCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
        <div className="h-full w-full bg-gray-200"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-transparent to-transparent flex flex-col justify-end p-6">
          <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {location.pathname === "/services" && <OceanScene />}
      
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="mx-auto max-w-7xl">
          {location.pathname === "/" && (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900 mb-3">
                Our Premium Services
              </h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-lg text-blue-700 max-w-3xl mx-auto">
                Comprehensive water solutions with seamless rentals and expert maintenance
              </p>
            </div>
          )}

          {error ? (
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Services</h2>
              <p className="text-gray-600">{error}</p>
              <button 
                onClick={() => fetchServices()} 
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <p className="text-blue-800 font-medium">
                  Didn't find what you're looking for?
                </p>
                <button 
                  onClick={() => setOpenDailog(true)} 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Request Quotation
                </button>
              </div>

              <div className="relative w-full">
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Autoplay]}
                  spaceBetween={30}
                  centeredSlides={false}
                  loop={!loading && services.length > 3}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  navigation={false}
                  autoplay={!loading && services.length > 3 ? { delay: 4000, disableOnInteraction: false } : false}
                  className="services-swiper !px-4"
                >
                  {loading ? (
                    [...Array(4)].map((_, index) => (
                      <SwiperSlide key={`skeleton-${index}`}>
                        <ServiceCardSkeleton />
                      </SwiperSlide>
                    ))
                  ) : services && services.length > 0 ? (
                    services.map((service, index) => (
                      <SwiperSlide key={index} onClick={() => handleServiceClick(service)}>
                        <div className="group relative h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl">
                          <div className="relative h-80 overflow-hidden">
                            <img
                              className="w-auto h-[90%] object-cover transition-transform duration-700 group-hover:scale-110 mx-auto"
                              src={service.imageUrl}
                              alt={service.title}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-blue-900/10 to-transparent flex flex-col justify-end p-6">
                              <h3 className="text-xl font-bold text-white mb-2 transition-transform duration-300 group-hover:-translate-y-2">
                                {service.title}
                              </h3>
                              <p className="text-blue-100 text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                                {stripHtmlTags(service.shortDescription)}
                              </p>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="py-12 w-full text-center">
                        <p className="text-xl text-gray-600 text-center w-full ">No services available</p>
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>

                {isDesktop && !loading && services.length > 0 && (
                  <>
                    <button
                      className="hidden md:flex items-center justify-center absolute top-1/2 -left-16 z-40 transform -translate-y-1/2 bg-white w-14 h-14 rounded-full shadow-xl hover:bg-blue-50 transition-colors duration-300"
                      onClick={handlePrev}
                    >
                      <GrPrevious className="text-blue-600 text-xl" />
                    </button>

                    <button
                      className="hidden md:flex items-center justify-center absolute top-1/2 -right-16 z-40 transform -translate-y-1/2 bg-white w-14 h-14 rounded-full shadow-xl hover:bg-blue-50 transition-colors duration-300"
                      onClick={handleNext}
                    >
                      <GrNext className="text-blue-600 text-xl" />
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      {
        openDailog && (<section><RequestQuotationBox setOpenDailog={setOpenDailog} /></section>)
      }
    </>
  );
};

export default Services;


