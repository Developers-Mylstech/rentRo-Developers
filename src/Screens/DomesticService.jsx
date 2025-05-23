import React, { useEffect } from "react";
import Sale from "../Screens/Sale.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import OurClientsReview from '../Screens/OurClientsReview.jsx'

// images import

import domestic1 from "../assets/Domesticservice/domestic1.png";
import domestic2 from "../assets/Domesticservice/domestic2.png";
import domestic3 from "../assets/Domesticservice/domestic3.png";

function DomesticService() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
      easing: "ease-out-back", // Easing type
      once: true, // Animation should happen once
    });
  }, []);

  // Slick settings for the testimonial slider
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Sale />
      <section className=" py-12 w-full  bg-white">
        <div className="max-w-full   mx-auto grid md:grid-cols-2 gap-10 items-center bg-gradient-to-r from-blue-100 to-white py-12 px-6 rounded-lg shadow-lg">
          {/* Left Section - Text Content */}
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-4xl font-bold text-blue-800 mb-2 leading-tight">
              Domestic Water Filter Service
            </h2>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              GET TO KNOW SERVICE
            </h3>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              At RENT RO, we understand the importance of maintaining a healthy
              and efficient water filtration system in your home.
            </p>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Our Domestic Water Filter Service is designed to ensure your
              system operates at its best, delivering clean and safe water for
              your family.
            </p>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              We are committed to ensuring that your filtration system not only
              operates optimally but also consistently provides clean and safe
              water for every member of your household.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              With a team of skilled technicians specializing in a diverse range
              of systems, we bring a wealth of expertise to address the unique
              needs of your filtration setup.
            </p>
            <div>
        <Link
                                     to="/contact"
                                     // Adjust this URL to your actual contact page
                                     className="  text-blue-800 font-bold py-3 px-8 rounded-lg  hover:bg-sky-700 hover:text-white transition-all ease-in-out duration-300 shadow-md transform hover:scale-105"
                                   >
                                     CONTACT US
                                   </Link>
            </div>
          </div>

          {/* Right Section - Images */}
          <div className="grid grid-cols-2 gap-7">
            {" "}
            {/* Increased gap here */}
            <img
              src={domestic1} // Directly use the imported variable
              className="w-auto h-full object-cover rounded-lg border-2 shadow-lg transition-transform transform hover:scale-105"
              alt="IMG1"
            />
            <img
              src={domestic2} // Directly use the imported variable
              className="w-full object-cover rounded-lg border-2 border-gray-300 shadow-lg transition-transform transform hover:scale-105"
              alt="IMG2"
            />
            <img
              src={domestic3} // Directly use the imported variable
              className="col-span-2 w-full object-cover rounded-lg border-2 border-gray-300 shadow-lg transition-transform transform hover:scale-105"
              alt="IMG3"
            />
          </div>
        </div>

        {/* Why choose RENT RO Services */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-blue-900">
            Why Choose RENT RO Service
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mt-2">
            Select RENT RO Service for superior domestic water filter care,
            where proactivity meets expertise, ensuring uninterrupted access to
            clean and safe water for your family's peace of mind.
          </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div
              className="bg-white p-6 shadow-md rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
            >
              <h4 className="font-semibold text-blue-800">Expert Technicians</h4>
              <p className="text-gray-600 mt-2">
                Our skilled technicians are trained to handle a variety of
                domestic water filter models, ensuring expert care for your
                specific system.
              </p>
            </div>
            <div
              className="bg-white p-6 shadow-md rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h4 className="font-semibold text-blue-800">Scheduled Visits</h4>
              <p className="text-gray-600 mt-2">
                Enjoy the convenience of pre-scheduled service visits,
                eliminating the hassle of remembering when your filter needs
                attention.
              </p>
            </div>
            <div
              className="bg-white p-6 shadow-md rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h4 className="font-semibold text-blue-800">Optimized Performance</h4>
              <p className="text-gray-600 mt-2">
                Our service plans are designed to optimize your domestic water
                filter’s performance, guaranteeing clean and safe water
                consistently.
              </p>
            </div>
            <div
              className="bg-white p-6 shadow-md rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <h4 className="font-semibold text-blue-800">Extended Filter Lifespan</h4>
              <p className="text-gray-600 mt-2">
                Regular maintenance extends the lifespan of your filters,
                providing long-term cost savings and reducing environmental
                impact.
              </p>
            </div>
            <div
              className="bg-white p-6 shadow-md rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <h4 className="font-semibold text-blue-800">Transparent Pricing</h4>
              <p className="text-gray-600 mt-2">
                We prioritize your peace of mind with transparent pricing – no
                hidden fees or surprises. Know exactly what to expect for a
                worry-free experience.
              </p>
            </div>
            <div
              className="bg-white p-6 shadow-md rounded-lg text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <h4 className="font-semibold text-blue-800">Priority Support</h4>
              <p className="text-gray-600 mt-2">
                Benefit from priority support and scheduling with our premium
                service plans, giving you peace of mind and swift assistance
                when needed.
              </p>
            </div>
          </div>
        </div>
      </section>
    <section>
        <OurClientsReview/>
    </section>
    {/* <BottomNav/> */}
    {/* <ScrollToTopButton/> */}

    </>
  );
}

export default DomesticService;
