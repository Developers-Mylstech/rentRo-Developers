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
import useServiceStore from "../Context/ServiceContext";
import { useNavigate } from "react-router-dom";

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
            centeredSlides={true}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 3.5 },
            }}
            navigation={false}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="services-swiper"
          >
            {services.map((service, index) => (
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
            ))}
          </Swiper>

          {isDesktop && (
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
      </div>
    </section>

    {openDailog && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <RequestQuotationBox setOpenDailog={setOpenDailog} />
      </div>
    )}
  </>
);
};

export default Services;

const RequestQuotationBox = ({ setOpenDailog }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
            const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Request Quotation</h2>
          <button
            onClick={() => setOpenDailog(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              ref={fileInputRef}
              capture
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Image Preview */}
            {preview && (
              <div className="mt-4 relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-40 w-full object-contain border rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name*</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile *</label>
            <input
              type="tel"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name (if)</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
