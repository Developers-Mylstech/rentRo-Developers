// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import OurClientsReview from '../Screens/OurClientsReview.jsx';

// // Images import
// import Domestic from '../assets/Rent/Domestic.png';
// import Img1 from '../assets/Aboutus/Img1.png';
// import Img2 from '../assets/Aboutus/Img2.png';
// import Img3 from '../assets/Aboutus/Img3.png';
// import OceanScene from "../Components/widget/OceanScene.jsx";

// const AboutUs = () => {
//   const navigate = useNavigate(); // Declare useNavigate

//   return (
//     <>
//       <OceanScene />
//       <div className="container mx-auto px-4 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//           {/* Images */}
//           <div className="grid grid-cols-2 gap-4">
//             <img src={Img1} alt="Team Meeting" className="rounded-lg shadow-lg" />
//             <img src={Img2} alt="Happy Family" className="rounded-lg shadow-lg" />
//             <img src={Img3} alt="Teamwork" className="col-span-2 rounded-lg shadow-lg" />
//           </div>

//           {/* Text Content */}
//           <div>
//             <h2 className="text-blue-900 font-bold text-xl">WHO WE ARE</h2>
//             <h3 className="text-2xl font-bold mt-2">GET TO KNOW RENT RO</h3>
//             <p className="text-gray-600 mt-4">
//               RENT RO Established in the year 2019 with the agenda to bring the change in affordability of water filters.
//             </p>
//             <p className="text-gray-600 mt-2">
//               RENT RO with the vision to change the water industry by providing water purifiers on rental plans and make affordable good drinking water for everyone.
//             </p>
//             <p className="text-gray-600 mt-2">
//               Our mission is thriving to ensure every home, office, or workplace has access to clean drinking water. Switch from bottled water to filtered water.
//             </p>
//             <button  
//               className="bg-sky-700 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-sky-500 mt-4 transition"
//               onClick={() => navigate('/contact')} // Corrected navigate usage
//             >
//               GET TO KNOW
//             </button>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 text-center mt-12 gap-8">
//           <div>
//             <span className="text-blue-900 text-3xl">&#128100;</span>
//             <h4 className="font-bold mt-2">Customer Services</h4>
//             <p className="text-gray-500">Top notch customer service.</p>
//           </div>
//           <div>
//             <span className="text-blue-900 text-3xl">&#128717;</span>
//             <h4 className="font-bold mt-2">Pickup At Any Store</h4>
//             <p className="text-gray-500">Free shipping on orders over AED200.</p>
//           </div>
//           <div>
//             <span className="text-blue-900 text-3xl">&#128274;</span>
//             <h4 className="font-bold mt-2">Secured Payment</h4>
//             <p className="text-gray-500">We accept all major credit cards.</p>
//           </div>
//           <div>
//             <span className="text-blue-900 text-3xl">&#128176;</span>
//             <h4 className="font-bold mt-2">Free Returns</h4>
//             <p className="text-gray-500">30-days free return policy.</p>
//           </div>
//         </div>
//       </div>

   
//     </>
//   );
// };

// export default AboutUs;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance';
import OurClientsReview from '../Screens/OurClientsReview.jsx';
import OceanScene from "../Components/widget/OceanScene.jsx";

const AboutUs = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axiosInstance.get('/about-us');
        setAboutData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch about us data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Content</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <OceanScene />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Dynamic Zigzag Sections */}
        {aboutData.map((section, index) => (
          <div 
            key={section.aboutUsId}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 mb-24`}
          >
            {/* Image Grid */}
            <div className="w-full md:w-1/2 h-auto">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={section.image?.imageUrl || 'https://via.placeholder.com/400'}
                    alt={section.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  
                  />
                </div>
                
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2">
              <div className={`p-6 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <span className="text-blue-600 font-semibold tracking-wide">{section.title}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
                  {section.subtitle}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {section.description}
                </p>
                {index === 0 && (
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Get In Touch
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Features Section */}
        <div className="my-24">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '👨‍💼',
                title: 'Customer Services',
                desc: '24/7 dedicated support team'
              },
              {
                icon: '🚚',
                title: 'Nationwide Delivery',
                desc: 'Free shipping on orders over AED200'
              },
              {
                icon: '🔒',
                title: 'Secured Payment',
                desc: 'SSL encrypted transactions'
              },
              {
                icon: '🔄',
                title: 'Free Returns',
                desc: '30-day satisfaction guarantee'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant CTA Section */}
        <div className="relative my-6 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
          <div className="relative z-10 py-20 px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience Pure Water?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their water purification needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white text-blue-800 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Contact Our Experts
              </button>
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;