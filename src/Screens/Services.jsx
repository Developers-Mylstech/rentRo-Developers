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
  const [openDailog, setOpenDailog] = useState(false)
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
          <div className="flex justify-between md:justify-end items-center my-4 font-semibold gap-4 text-sm">
            Didn't find your product?            <button onClick={() => setOpenDailog(true)} className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 rounded-lg text-white">Request Qoutation</button>
          </div>
          {/* <h4 className="text-center md:text-xl text-gray-500 mb-8">
            Comprehensive Water Solutions, Seamless Monthly Water Filter Rentals
            and Expert Maintenance Services for Pure, Hassle-free Hydration
          </h4> */}

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
                      className={`absolute inset-x-0 bottom-0 bg-blue-500/50 flex justify-center items-center flex-col text-white h-full text-center px-6 py-6 transition-all duration-500 ease-in-out ${isMobile
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
                      className={`relative bottom-4 left-1/2 transform -translate-x-1/2 text-blue-950 text-center text-lg font-semibold transition-opacity duration-300 ease-in-out ${isMobile
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
                    <GrNext />
                  </span>
                  <div className="liquid"></div>
                </button>

                <button
                  className="hidden border-2 border-white custom-prev liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 left-2 z-40 transform -translate-y-1/2"
                  onClick={handlePrev}
                >
                  <span className="relative text-xl font-semibold z-10">
                    <GrPrevious />
                  </span>
                  <div className="liquid"></div>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      {
        openDailog && (<section><RequestQuotationBox setOpenDailog={setOpenDailog} /></section>)
      }


      {/* {location.pathname === "/services" && <BottomNav />} */}
      {/* <ScrollToTopButton /> */}
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
