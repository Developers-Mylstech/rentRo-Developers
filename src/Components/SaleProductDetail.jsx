import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GiWaterSplash } from "react-icons/gi";
import { FaWater, FaTools, FaCogs, FaShieldAlt, FaTint, FaCheckCircle, FaSlidersH, FaBolt, FaCheck } from 'react-icons/fa';

const ProductDetail = () => {
  const { name } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rent');
  const [amcType, setAmcType] = useState('gold');
  const [allReviews, setAllReviews] = useState(product?.reviews || []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500 text-lg">★</span>);
    }

    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-500 text-lg">☆</span>);
    }

    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="text-gray-300 text-lg">★</span>);
    }

    return stars;
  };

  const getFeatureIcon = (feature) => {
    if (feature.toLowerCase().includes("purification")) return <FaWater />;
    if (feature.toLowerCase().includes("design")) return <FaCogs />;
    if (feature.toLowerCase().includes("installation")) return <FaTools />;
    if (feature.toLowerCase().includes("mineral")) return <FaTint />;
    if (feature.toLowerCase().includes("uv")) return <FaShieldAlt />;
    if (feature.toLowerCase().includes("shut-off")) return <FaBolt />;
    if (feature.toLowerCase().includes("tds")) return <FaSlidersH />;
    if (feature.toLowerCase().includes("filters")) return <FaCheckCircle />;
    if (feature.toLowerCase().includes("rust")) return <FaShieldAlt />;
    if (feature.toLowerCase().includes("ss")) return <FaCheckCircle />;
    return <GiWaterSplash />; // default icon
  };

  if (!product) {
    return <div className="text-center mt-14">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white mt-0 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
        
          <img
            src={product.image}
            alt={product.name}
            className="w-full  col-span-3 md:col-span-1 object-cover rounded-lg shadow"
          />
       

        <div className="h-[80%] flex flex-col gap-2 col-span-3 md:col-span-2">
          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:items-center">
            <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center">
              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-400 mt-1 text-sm">
                {product.category} | <span className="font-medium">{product.brand}</span>
              </p>
            </div>
            <div className="flex items-center gap-1">{renderStars(product.rating)} ({product.rating} / 5)</div>
          </div>

          <div className="flex justify-between border-b border-gray-200 mt-6">
            <button
              onClick={() => setActiveTab('rent')}
              className={`py-2 w-1/3 px-4 font-medium text-sm focus:outline-none ${activeTab === 'rent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Rent
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`py-2 px-4 w-1/3 font-medium text-sm focus:outline-none ${activeTab === 'sell' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Sell
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`py-2 px-4 w-1/3 font-medium text-sm focus:outline-none ${activeTab === 'service' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Service
            </button>
          </div>

          <div className="mt-4 w-full">
            {activeTab === 'rent' && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Benefits of Renting</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "No large upfront investment",
                      "Flexible rental periods",
                      "Free maintenance included",
                      "Easy upgrades to newer models",
                      "24/7 customer support",
                      "No repair costs"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="text-blue-500 mt-1">
                          <FaCheckCircle />
                        </div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Pricing Details</h3>
                  <div className="grid grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg">
                    {[
                      { label: "Actual Price", value: "1000 AED", highlight: false },
                      { label: "Discount Price", value: "800 AED", highlight: true },
                      { label: "VAT", value: "+ 5%", highlight: false }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <p className="text-gray-500 font-medium text-sm">{item.label}</p>
                        <p className={`font-semibold text-lg ${item.highlight ? 'text-blue-600' : ''}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <button
                    onClick={() => navigate('/login')}
                    className="md:w-fit w-full px-5  bg-gradient-to-l from-blue-500 to-cyan-400 text-white font-bold hover:bg-blue-700 py-1 rounded-lg transition"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'sell' && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Benefits of Purchase</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "No large upfront investment",
                      "Flexible rental periods",
                      "Free maintenance included",
                      "Easy upgrades to newer models",
                      "24/7 customer support",
                      "No repair costs"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="text-blue-500 mt-1">
                          <FaCheckCircle />
                        </div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Pricing Details</h3>
                  <div className="grid grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg">
                    {[
                      { label: "Actual Price", value: "1000 AED", highlight: false },
                      { label: "Discount Price", value: "800 AED", highlight: true },
                      { label: "VAT", value: "+ 5%", highlight: false }
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <p className="text-gray-500 font-medium text-sm">{item.label}</p>
                        <p className={`font-semibold text-lg ${item.highlight ? 'text-blue-600' : ''}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <button
                    onClick={() => navigate('/login')}
                    className="md:w-fit w-full px-5  bg-gradient-to-l from-blue-500 to-cyan-400 text-white font-bold hover:bg-blue-700 py-1 rounded-lg transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'service' && (
              <div className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                  {[
                    {
                      type: "One Time",
                      price: "800 AED (+5% VAT)",
                      features: [
                        "Quick problem resolution",
                        "No long-term commitments",
                        "Ideal for small fixes",
                        "Pay only for what you need",
                        "Same-day service available",
                        "No contract required"
                      ],
                      popular: false
                    },
                    {
                      type: "MMC",
                      price: "800 AED (+5% VAT)",
                      features: [
                        "Monthly Maintenance Coverage",
                        "Priority Support",
                        "Discount on parts & services",
                        "Ideal for regular checkups",
                        "2 free visits per month",
                        "Extended warranty"
                      ],
                      popular: true
                    },
                    {
                      type: "AMC",
                      price: {
                        basic: "800 AED (+5% VAT)",
                        gold: "1500 AED (+5% VAT)"
                      },
                      features: [
                        "Monthly Maintenance Coverage",
                        "Priority Support",
                        "Discount on parts & services",
                        "Ideal for regular checkups",
                        "2 free visits per month",
                        "Extended warranty"
                      ], popular: false,
                      options: ["basic", "gold"]  // Add this line
                    }
                  ].map((service, index) => (
                    <div
                      key={index}
                      className={`relative rounded-xl p-6 border transition-all duration-300 hover:shadow-lg
                ${service.popular
                          ? "bg-gradient-to-b from-blue-100 to-white border-blue-300 ring-2 ring-blue-200"
                          : "bg-gradient-to-t from-blue-50 to-cyan-50 border-gray-300"
                        }`}
                    >
                      {service.popular && (
                        <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          POPULAR
                        </div>
                      )}

                      <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                        {service.type} Service
                      </h2>
                      {service.type === "AMC" && (
                        <div className="flex border rounded-lg p-1 mb-3 w-full  ">
                          {['basic', 'gold'].map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={`flex-1 py-1 px-4 text-sm font-medium rounded-md transition-colors ${amcType === option ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                              onClick={() => setAmcType(option)}
                            >
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}

                      <ul className="grid grid-cols-1 gap-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <span className="text-blue-500 mr-2 mt-1">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 border-t pt-4">
                        <h5 className="text-lg font-bold text-blue-800 mb-3">
                          {typeof service.price === 'object' ? '' + service.price.basic : service.price}
                        </h5>
                        <button
                          onClick={() => navigate('/login')}
                          className={`w-full py-2 rounded-lg transition font-medium
                ${service.popular
                              ? "bg-gradient-to-l from-blue-500 to-cyan-500 text-white"
                              : "bg-gradient-to-l from-blue-500 to-cyan-500 text-white"
                            }`}
                        >
                          Select {service.type} Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 my-4">
        
          <div className=" my-5">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Premium Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                "Advanced 6-stage filtration system",
                "Energy-efficient operation (saves 30% power)",
                "Smart TDS monitoring with digital display",
                "Automatic shut-off protection",
                "UV sterilization technology",
                "Removes 99.9% of bacteria and viruses",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex text-sm items-start p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all"
                >
                  <div className="bg-blue-100 p-1.5 rounded-full mr-3 mt-0.5">
                    <FaCheck className="text-blue-600 text-sm" />
                  </div>
                  <p className="text-gray-700 font-medium flex-1">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        {product.longDescription && (
          <div className="border-t p-2 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Description:</h3>
            <p className="text-sm text-gray-500 whitespace-pre-line md:text-left text-justify">{product.longDescription}</p>
          </div>
        )}

        <div className="border-t p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Specifications:</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3 text-sm text-gray-700">
            <li className="flex font-semibold gap-2"><span className="font-medium text-gray-400">Capacity:</span> {product.capacity}</li>
            <li className="flex font-semibold gap-2"><span className="font-medium text-gray-400">Power:</span> {product.powerUsage}</li>
            <li className="flex font-semibold gap-2"><span className="font-medium text-gray-400">Material:</span> {product.material}</li>
            <li className="flex font-semibold gap-2"><span className="font-medium text-gray-400">Warranty:</span> {product.warranty}</li>
            <li className="flex col-span-2 md:col-span-1 font-semibold gap-2"><span className="font-medium text-gray-400">Dimensions:</span> {product.dimensions}</li>
            <li className="flex font-semibold gap-2"><span className="font-medium text-gray-400">Weight:</span> {product.weight}</li>
            <li className="flex font-semibold gap-2"><span className="font-medium text-gray-400">Installation:</span> {product.installationType}</li>
            <li className="flex font-semibold gap-2"><span className="font-medium text-gray-400">Stock:</span> {product.stock}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;