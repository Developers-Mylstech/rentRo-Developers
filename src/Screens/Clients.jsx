import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Clients = () => {
  const swiperRef = useRef(null);
  const clients = [
    {
      name: "Client 1",
      description:
        "Client 1's testimonial or description goes here. Highlight the benefits they gained from your services.",
      logo: "https://via.placeholder.com/150", // Example placeholder image for client logo
    },
    {
      name: "Client 2",
      description:
        "Client 2's testimonial or description goes here. Highlight the benefits they gained from your services.",
      logo: "https://via.placeholder.com/150", // Example placeholder image for client logo
    },
    {
      name: "Client 3",
      description:
        "Client 3's testimonial or description goes here. Highlight the benefits they gained from your services.",
      logo: "https://via.placeholder.com/150", // Example placeholder image for client logo
    },
    {
      name: "Client 4",
      description:
        "Client 4's testimonial or description goes here. Highlight the benefits they gained from your services.",
      logo: "https://via.placeholder.com/150", // Example placeholder image for client logo
    },
  ];

  const [hideDescription, setHideDescription] = useState(false);

  const toggleDescription = () => {
    setHideDescription(!hideDescription);
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Clients</h2>
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2.3 },
            1280: { slidesPerView: 3 },
          }}
          navigation={false} // Disable default navigation buttons
          className="w-full"
        >
          {clients.map((client, index) => (
            <SwiperSlide key={index} onClick={toggleDescription}>
              <div className="group relative rounded-2xl bg-transparent overflow-hidden cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg">
                <div className="absolute inset-0 bg-black z-30 opacity-30"></div>
                <img
                  className="h-72 md:h-96 w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                  src={client.logo}
                  alt={client.name}
                />
                <div
                  className={`absolute inset-x-0 bottom-[-20%] z-20 h-0 bg-black/60 flex items-center justify-center text-center 
                    transition-all duration-500 ease-in-out group-hover:h-[120%] ${hideDescription ? "hidden" : ""}`}
                >
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">{client.name}</h3>
                    <p className="text-md italic mt-2">{client.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 z-40 text-center transition-opacity duration-200 group-hover:opacity-0">
                  <h3
                    style={{
                      textShadow: "2px 2px 2px rgba(4, 4, 198, 0.936)",
                    }}
                    className="text-lg font-bold text-white"
                  >
                    {client.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        <button
          className="hidden custom-next bg-white text-black rounded-full w-10 h-10 md:flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-xs absolute top-1/2 right-2 z-50 transform -translate-y-1/2"
          onClick={handleNext}
        >
          Next
        </button>
        <button
          className=" hidden custom-prev bg-white text-black rounded-full w-10 h-10 md:flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-xs absolute top-1/2 left-2 z-40 transform -translate-y-1/2"
          onClick={handlePrev}
        >
          Prev
        </button>
        </Swiper>
        {/* Custom Navigation Buttons */}
        {/* Custom Indicators */}
        {/* <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
          {clients.map((_, index) => (
            <button
              key={index}
              className="carousel-indicator h-3 w-3 rounded-full bg-white"
              aria-label={`Slide ${index + 1}`}
              onClick={() => swiperRef.current.swiper.slideTo(index)}
            ></button>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Clients;
