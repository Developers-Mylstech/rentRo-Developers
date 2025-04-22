




import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../index.css";

import "swiper/swiper-bundle.min.css"; // Swiper styles

// images import
import img1 from "../assets/Product on Monthly rent/img1.png";
import img2 from "../assets/Product on Monthly rent/img2.png";
import img3 from "../assets/Product on Monthly rent/img3.png";
import img4 from "../assets/Product on Monthly rent/img4.png";
import img5 from "../assets/Product on Monthly rent/img5.png";

//Brand logo import
import Aquaguard from "../assets/OurBrand/Aquaguard.png";
import Aquapro from "../assets/OurBrand/Aquapro.png";
import Bluewater from "../assets/OurBrand/Bluewater.png";
import Culligan from "../assets/OurBrand/Culligan.png";
import Kent from "../assets/OurBrand/Kent.png";
import WaterLogic from "../assets/OurBrand/WaterLogic.png";

const products = [
  {
    id: 1,
    name: "Domestic Water Filter",
    price: "AED50.00",
    image: img1,
    rating: 3.5,
  },
  {
    id: 2,
    name: "Commercial Water Filter",
    price: "AED100.00",
    image: img2,
    rating: 4,
  },
  {
    id: 3,
    name: "Industrial Water Filter",
    price: "AED50.00",
    image: img3,
    rating: 4.5,
  },
  { id: 4, name: "Water Dispenser", price: "AED50.00", image: img4, rating: 4 },
  { id: 5, name: "Water Cooler", price: "AED50.00", image: img5, rating: 4 },
];

const brands = [
  { id: 1, name: "Blue Water", image: Bluewater },
  { id: 2, name: "Aqua Pro", image: Aquapro },
  { id: 3, name: "Culligan", image: Culligan },
  { id: 4, name: "Kent Water", image: Kent },
  { id: 5, name: "Water Logic", image: WaterLogic },
  { id: 6, name: "Aquaguard", image: Aquaguard },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
};

const ProductsSection = () => {
  return (
    <>
    <div className="mx-auto py-20 px-4">
      {/* Products On Rent */}
      <div className="flex justify-center items-center">
     <div className="relative inline-flex">
      <span className="text-white w-20%  bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl animate-pulse">
        Just for You
      </span>
      <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
    </div>
     </div>
      <h1 className="text-center text-blue-800  text-2xl font-bold my-4">
        Products On Monthly Rent
      </h1>

      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1.4 },
          1024: { slidesPerView: 2.3 },
          1280: { slidesPerView: 3.5 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full relative"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover mb-3"
            />
            <h3 className="text-red-500 font-bold">{product.price}</h3>
            <p className="text-gray-700 text-sm">{product.name}</p>
            <div className="mt-2">{renderStars(product.rating)}</div>
          </SwiperSlide>
        ))}
      </Swiper>

     

      {/* New Products Section */}
      <div className="flex justify-center py-8 items-center mt-20">
     <div className="relative inline-flex ">
      <span className="text-white w-20%  bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl animate-pulse">
        Just for You
      </span>
      <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></div>
    </div>
     </div>
      <h1 className="text-center text-2xl font-bold my-4 text-blue-800">New Products</h1>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1.4 },
          1024: { slidesPerView: 2.3 },
          1280: { slidesPerView: 3.5 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full relative"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="w-full  flex flex-col items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-1/2 object-cover mb-3"
              />
              <p className="text-gray-700 text-sm">{product.name}</p>
              <div className="mt-2">{renderStars(product.rating)}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    {/* <BottomNav/> */}
    </>
  );
};

export default ProductsSection;
