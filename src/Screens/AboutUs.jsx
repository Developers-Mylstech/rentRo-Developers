import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import OurClientsReview from '../Screens/OurClientsReview.jsx';

// Images import
import Domestic from '../assets/Rent/Domestic.png';
import Img1 from '../assets/Aboutus/Img1.png';
import Img2 from '../assets/Aboutus/Img2.png';
import Img3 from '../assets/Aboutus/Img3.png';
import OceanScene from "../Components/OceanScene.jsx";

const AboutUs = () => {
  const navigate = useNavigate(); // Declare useNavigate

  return (
    <>
      <OceanScene />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <img src={Img1} alt="Team Meeting" className="rounded-lg shadow-lg" />
            <img src={Img2} alt="Happy Family" className="rounded-lg shadow-lg" />
            <img src={Img3} alt="Teamwork" className="col-span-2 rounded-lg shadow-lg" />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-blue-900 font-bold text-xl">WHO WE ARE</h2>
            <h3 className="text-2xl font-bold mt-2">GET TO KNOW RENT RO</h3>
            <p className="text-gray-600 mt-4">
              RENT RO Established in the year 2019 with the agenda to bring the change in affordability of water filters.
            </p>
            <p className="text-gray-600 mt-2">
              RENT RO with the vision to change the water industry by providing water purifiers on rental plans and make affordable good drinking water for everyone.
            </p>
            <p className="text-gray-600 mt-2">
              Our mission is thriving to ensure every home, office, or workplace has access to clean drinking water. Switch from bottled water to filtered water.
            </p>
            <button  
              className="bg-sky-700 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-sky-500 mt-4 transition"
              onClick={() => navigate('/contact')} // Corrected navigate usage
            >
              GET TO KNOW
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 text-center mt-12 gap-8">
          <div>
            <span className="text-blue-900 text-3xl">&#128100;</span>
            <h4 className="font-bold mt-2">Customer Services</h4>
            <p className="text-gray-500">Top notch customer service.</p>
          </div>
          <div>
            <span className="text-blue-900 text-3xl">&#128717;</span>
            <h4 className="font-bold mt-2">Pickup At Any Store</h4>
            <p className="text-gray-500">Free shipping on orders over AED200.</p>
          </div>
          <div>
            <span className="text-blue-900 text-3xl">&#128274;</span>
            <h4 className="font-bold mt-2">Secured Payment</h4>
            <p className="text-gray-500">We accept all major credit cards.</p>
          </div>
          <div>
            <span className="text-blue-900 text-3xl">&#128176;</span>
            <h4 className="font-bold mt-2">Free Returns</h4>
            <p className="text-gray-500">30-days free return policy.</p>
          </div>
        </div>
      </div>

      <section>
        <OurClientsReview />
      </section>
      <ScrollToTopButton />

    </>
  );
};

export default AboutUs;
