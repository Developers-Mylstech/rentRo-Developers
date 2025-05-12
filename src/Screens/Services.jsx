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
import { RiFileSearchFill } from "react-icons/ri";
import { Dialog } from "primereact/dialog";
const Services = () => {
  const swiperRef = useRef(null);
  const [openDailog, setOpenDailog] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsDesktop(window.innerWidth >= 1024);

      // if (swiperRef.current) {
      //   swiperRef.current.swiper.update();
      // }
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
        <div className="mx-auto ">
          {location.pathname === "/" && (
            <div className="text-center mb-16 ">
              <h2 className="md:text-3xl text-xl font-bold  mb-4">Our Premium Services</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
              <p className="md:text-lg text-sm text-blue-700 max-w-3xl mx-auto">
                Comprehensive water solutions with seamless rentals and expert
                maintenance
              </p>
            </div>
          )}

          {error ? (
            <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"></div>
              <h2 className="text-2xl font-bold text-red-600 mb-3">
                Error Loading Services
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => fetchServices()}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {loading ? (
                  [...Array(4)].map((_, index) => (
                    <ServiceCardSkeleton key={`skeleton-${index}`} />
                  ))
                ) : services && services?.length > 0 ? (
                  services?.map((service, index) => (
                    <div
                      key={index}
                      onClick={() => handleServiceClick(service)}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="relative h-60 overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={service.imageUrl}
                          alt={service.title}
                          loading="lazy"
                        />
                        <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                            New
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                            {service.title}
                          </h3>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {/* {stripHtmlTags(service.shortDescription)} */}
                        </p>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 text-yellow-400 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">
                              4.8
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              (24)
                            </span>
                          </div>

                          <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                            View details
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300 rounded-xl pointer-events-none transition-all duration-300"></div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center bg-white rounded-xl shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <RiFileSearchFill className="text-blue-500 text-2xl" />
                    </div>
                    <p className="text-xl text-gray-600">
                      No services available at the moment
                    </p>
                  </div>
                )}
              </div>

              {/* <div className="flex flex-col items-center mt-16 mb-8 gap-4 bg-blue-50 p-4 ">
                <p className="text-gray-500 font-medium text-lg">
                  Didn't find what you're looking for?
                </p>
                <button
                  onClick={() => setOpenDailog(true)}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-2 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span className="relative z-10">Request Quotation</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div> */}
              <div className="flex max-w-5xl mx-auto flex-col items-center mt-16 mb-8 gap-4 bg-gradient-to-r from-blue-50 to-violet-50 p-4 rounded-xl ">
                <div className="md:p-2 p-2 relative flex flex-col justify-start items-center gap-4 md:w-[80%] w-full mx-auto ">
                  {/* Top-left border */}
                  <div className="absolute top-0 left-0 h-[80%] w-[95%] border-t-2 border-l-2 border-blue-600"></div>

                  {/* Bottom-right border */}
                  <div className="absolute bottom-0 right-0 h-[80%] w-[95%]  border-b-2 border-r-2 border-blue-600"></div>

                  <div className="flex flex-col items-center gap-4 border border-blue-600 md:py-8 p-4  w-full ">
                    <p className="text-gray-500 font-medium md:text-lg text-xs">
                      Didn't find what you're looking for?
                    </p>
                    <button
                      onClick={() => setOpenDailog(true)}
                      className="relative overflow-hidden bg-gradient-to-r md:text-base text-sm from-blue-600 to-cyan-500 px-8 py-2 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <span className="relative z-10 ">Request Quotation</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Dialog
        header="Request Quotation"
        visible={openDailog}
        onHide={() => setOpenDailog(false)}
        className="w-[95vw] sm:w-[70vw] lg:w-[50vw]"
        draggable={false}
        resizable={false}
        blockScroll
        modal
      >
        <RequestQuotationBox />
      </Dialog>
    </>
  );
};

export default Services;
