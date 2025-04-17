import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  FaWater,
  FaTools,
  FaCogs,
  FaShieldAlt,
  FaTint,
  FaCheckCircle,
  FaSlidersH,
  FaBolt,
  FaCheck,
  FaStar,
  FaStarHalfAlt,
  FaRegStar
} from 'react-icons/fa';

const ProductDetail = () => {
  const { name } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rent');
  const [amcType, setAmcType] = useState('gold');
  const [allReviews, setAllReviews] = useState(product?.reviews || []);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <span key={i} className="text-yellow-400 text-lg">
              {rating >= starValue ? (
                <FaStar />
              ) : rating >= starValue - 0.5 ? (
                <FaStarHalfAlt />
              ) : (
                <FaRegStar />
              )}
            </span>
          );
        })}
        <span className="ml-1 text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const getFeatureIcon = (feature) => {
    const icons = {
      purification: <FaWater className="text-blue-500" />,
      design: <FaCogs className="text-blue-500" />,
      installation: <FaTools className="text-blue-500" />,
      mineral: <FaTint className="text-blue-500" />,
      uv: <FaShieldAlt className="text-blue-500" />,
      "shut-off": <FaBolt className="text-blue-500" />,
      tds: <FaSlidersH className="text-blue-500" />,
      filters: <FaCheckCircle className="text-blue-500" />,
      rust: <FaShieldAlt className="text-blue-500" />,
      ss: <FaCheckCircle className="text-blue-500" />
    };

    const matchedKey = Object.keys(icons).find(key =>
      feature.toLowerCase().includes(key)
    );

    return matchedKey ? icons[matchedKey] : '<GiWaterSplash className="text-blue-500" />';
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Data arrays
  const rentBenefits = [
    "No large upfront investment",
    "Flexible rental periods",
    "Free maintenance included",
    "Easy upgrades to newer models",
    "24/7 customer support",
    "No repair costs"
  ];

  const purchaseBenefits = [
    "Lifetime cost savings",
    "Full ownership benefits",
    "Higher resale value",
    "Customization options",
    "No monthly payments",
    "Complete control"
  ];

  const servicePlans = [
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
        "Annual Maintenance Contract",
        "Unlimited service visits",
        "Free replacement parts",
        "24/7 emergency support",
        "Full system inspection",
        "Premium customer care"
      ],
      popular: false,
      options: ["basic", "gold"]
    }
  ];

  const premiumFeatures = [
    "Advanced 6-stage filtration system",
    "Energy-efficient operation (saves 30% power)",
    "Smart TDS monitoring with digital display",
    "Automatic shut-off protection",
    "UV sterilization technology",
    "Removes 99.9% of bacteria and viruses",
    "Compact and space-saving design",
    "Easy one-click filter replacement"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {/* Product Image */}
          <div className="md:col-span-1 flex items-center justify-center rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-500 mt-1">
                  {product.category} | <span className="font-medium text-blue-600">{product.brand}</span>
                </p>
              </div>
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="">
                {['rent', 'sell', 'service'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-4 w-1/3 px-1 border-b font-medium text-sm ${activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-b text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="pt-4">
              {activeTab === 'rent' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits of Renting</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {rentBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
                    <div className="grid grid-cols-3 gap-4 bg-blue-50 rounded-lg p-4">
                      {[
                        { label: "Actual Price", value: "1000 AED" },
                        { label: "Discount Price", value: "800 AED", highlight: true },
                        { label: "VAT", value: "+5%" }
                      ].map((item, index) => (
                        <div key={index} className="text-center">
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className={`font-semibold ${item.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Rent Now
                  </button>
                </div>
              )}

              {activeTab === 'sell' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits of Purchase</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {purchaseBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
                    <div className="grid grid-cols-3 gap-4 bg-blue-50 rounded-lg p-4">
                      {[
                        { label: "Actual Price", value: "1000 AED" },
                        { label: "Discount Price", value: "800 AED", highlight: true },
                        { label: "VAT", value: "+5%" }
                      ].map((item, index) => (
                        <div key={index} className="text-center">
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className={`font-semibold ${item.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {activeTab === 'service' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicePlans.map((plan, index) => (
                      <div
                        key={index}
                        className={`relative rounded-xl border p-6 transition-all hover:shadow-md ${plan.popular
                          ? 'ring-2 ring-blue-300 border-blue-200 bg-blue-50'
                          : 'border-gray-200 bg-white'
                          }`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            POPULAR
                          </div>
                        )}

                        <h3 className="text-xl font-bold text-blue-800 mb-3">{plan.type} Service</h3>

                        {plan.options && (
                          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                            {plan.options.map(option => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setAmcType(option)}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition ${amcType === option
                                  ? 'bg-white shadow text-blue-600'
                                  : 'text-gray-600 hover:text-gray-800'
                                  }`}
                              >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                              </button>
                            ))}
                          </div>
                        )}

                        <ul className="space-y-2 mb-4">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <FaCheck className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 pt-4 border-t">
                          <p className="text-lg font-bold text-blue-800 mb-3">
                            {typeof plan.price === 'object'
                              ? plan.price[amcType]
                              : plan.price}
                          </p>
                          <button
                            onClick={() => navigate('/login')}
                            className={`w-full py-2 rounded-lg font-medium transition ${plan.popular
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600'
                              : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500'
                              }`}
                          >
                            Select {plan.type} Plan
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
      </div>


      <div className="mt-12 bg-white rounded-xl shadow-sm text-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Premium Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {premiumFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaCheck className="text-blue-600" />
                </div>
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-8">
          {product.longDescription && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
              <div className="prose prose-sm max-w-none text-gray-600">
                {product.longDescription.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Capacity", value: product.capacity },
                { label: "Power Usage", value: product.powerUsage },
                { label: "Material", value: product.material },
                { label: "Warranty", value: product.warranty },
                { label: "Dimensions", value: product.dimensions },
                { label: "Weight", value: product.weight },
                { label: "Installation", value: product.installationType },
                { label: "Stock", value: product.stock }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;