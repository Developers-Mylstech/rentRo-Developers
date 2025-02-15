import React, { useRef } from "react";
import Slider from "react-slick";
import './OurClientsReview.css';
import BottomNav from "../Components/BottomNav";

const slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: false,
  cssEase: "linear",
  arrows: false,  // Disable default arrows
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function OurClientsReview() {
  const sliderRef = useRef(null); // Create reference for the slider

  const handleNext = () => {
    sliderRef.current.slickNext(); // Navigate to next slide
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev(); // Navigate to previous slide
  };

  return (
    <>
      <section className="testimonial-section py-12 bg-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3 text-3xl font-bold text-gray-800">What Our Clients Say</h2>
            <p className="text-base text-gray-600">
              Rent RO transformed our water quality, exceeding expectations with
              top-notch service and <br /> reliable solutions.
            </p>
          </div>

          <div className="testimonial-slider relative ">
            <Slider ref={sliderRef} {...slickSettings}>
              {[ 
                {
                  name: "Sarfaz Sarfaz",
                  review: "Getting a water filter on RENT is amazing—no more headaches waiting for bottles and paying high prices. Very affordable and the best service in the RO industry in UAE.",
                },
                {
                  name: "Muhammad Ali",
                  review: "Simplicity meets excellence with Rent RO. Clean water made easy, outstanding service, and zero stress. Highly recommended!",
                },
                {
                  name: "Nam Las",
                  review: "Impressed by their service and maintenance of their filters. I will recommend using their RO products. Fully satisfied with Rent RO. The issue of drinking water in Dubai is solved.",
                },
                {
                  name: "Sahmim Khan",
                  review: "Good company, good service, good water.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="testimonial-contain opacity-0 transform transition-all duration-700 ease-in-out hover:opacity-100 hover:scale-105 w-full sm:w-3/4 px-4 sm:px-2"> {/* Adjusted width and padding */}
                  <div key={index} className="testimonial-contain opacity-0 transform transition-all duration-700 ease-in-out hover:opacity-100 hover:scale-105 w-full sm:px-8 md:px-4"> {/* Adjusted padding */}
                    <div className="testimonial-details bg-white p-4 rounded-lg shadow-lg transition-transform duration-500 hover:shadow-2xl hover:scale-105 h-auto flex flex-col justify-between"> {/* Reduced padding */}
                      <div>
                        <ul className="rating flex justify-center mb-4">
                          {[...Array(5)].map((_, starIndex) => (
                            <li key={starIndex}>
                              <i className="fas fa-star text-yellow-500"></i>
                            </li>
                          ))}
                        </ul>
                        <p className="details-images text-lg text-gray-700 mb-4 h-20 overflow-hidden"> {/* Reduced height */}
                          {testimonial.review}
                        </p>
                      </div>
                      <h5 className="font-bold text-gray-900 mt-auto text-sm sm:text-base">
                        {testimonial.name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            {/* Next button */}
            <button
              className="border-2 border-white custom-next liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 right-0 z-50 transform -translate-y-1/2"
              onClick={handleNext}
            >
              <span className="relative text-xl font-semibold z-10">Next</span>
              <div className="liquid"></div>
            </button>

            {/* Prev button */}
            <button
              className="border-2 border-white custom-prev liquid-button w-16 h-16 md:flex items-center justify-center shadow-sm transition-transform text-xs absolute top-1/2 left-0 z-40 transform -translate-y-1/2"
              onClick={handlePrev}
            >
              <span className="relative text-xl font-semibold z-10">Prev</span>
              <div className="liquid"></div>
            </button>
          </div>
        </div>
      </section>

      <BottomNav />
    </>
  );
}

export default OurClientsReview;
