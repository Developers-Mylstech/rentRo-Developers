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
  FaRegStar,
} from "react-icons/fa";
import "../index.css"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // required CSS
import { Carousel } from "react-responsive-carousel";

const ProductDetail = () => {
  const { name } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rent");
  const [amcType, setAmcType] = useState("amcBasic");
  const [allReviews, setAllReviews] = useState(product?.reviews || []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Product not found
          </h2>
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
    "No repair costs",
  ];

  const purchaseBenefits = [
    "Lifetime cost savings",
    "Full ownership benefits",
    "Higher resale value",
    "Customization options",
    "No monthly payments",
    "Complete control",
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
        "No contract required",
      ],
      popular: false,
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
        "Extended warranty",
      ],
      popular: true,
    },
    {
      type: "AMC",
      price: {
        basic: "800 AED (+5% VAT)",
        gold: "1500 AED (+5% VAT)",
      },
      features: [
        "Annual Maintenance Contract",
        "Unlimited service visits",
        "Free replacement parts",
        "24/7 emergency support",
        "Full system inspection",
        "Premium customer care",
      ],
      popular: false,
      options: ["basic", "gold"],
    },
  ];

  const premiumFeatures = [
    "Advanced 6-stage filtration system",
    "Energy-efficient operation (saves 30% power)",
    "Smart TDS monitoring with digital display",
    "Automatic shut-off protection",
    "UV sterilization technology",
    "Removes 99.9% of bacteria and viruses",
    "Compact and space-saving design",
    "Easy one-click filter replacement",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          <div className="md:col-span-1 flex items-center justify-center rounded-lg p-4 ">
            {product.imageUrls.length > 1 ? (
              <Carousel
             
  
              >
                {product.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full object-cover rounded-lg  "
                  />
                ))}
              </Carousel>
            ) : (
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full object-cover rounded-lg "

              />
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {product?.name}
                </h1>
                <p className="text-gray-500 mt-1">
                  {product.category.name} |{" "}
                  <span className="font-medium text-blue-600">
                    {product?.brand?.name}
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                {/* {renderStars(product.rating)} */}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="">
                {["rent", "sell", "service"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-4 w-1/3 px-1 border-b font-medium text-sm ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-b text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-4">
              {activeTab === "rent" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Benefits of Renting
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* {rentBenefits.map((benefit, index) => ( */}
                         {product?.productFor?.rent?.benefits?.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Pricing
                    </h3>
                    <div className="grid grid-cols-3 gap-4 bg-blue-50 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 "> Actual Price </p>
                        <p className={`text-gray-500 line-through`}>
                          {product?.productFor.rent.monthlyPrice} AED
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          {" "}
                          Discount Price{" "}
                        </p>
                        <p className={`text-blue-600 font-bold`}>
                          {product?.productFor.rent.discountPrice} AED
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500"> + VAT </p>
                        <p className={`text-blue-600 font-bold`}>
                          {product?.productFor.rent.vat} %
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/login")}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Rent Now
                  </button>
                </div>
              )}

              {activeTab === "sell" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Benefits of Purchase
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product?.productFor?.sell?.benefits?.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Pricing
                    </h3>
                    <div className="grid grid-cols-3 gap-4 bg-blue-50 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500"> Actual Price </p>
                        <p className={`text-gray-500 line-through`}>
                          {product?.productFor.sell.actualPrice} AED
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">
                          {" "}
                          Discount Price{" "}
                        </p>
                        <p className={`text-blue-600 font-bold`}>
                          {product?.productFor.sell.discountPrice} AED
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500"> + VAT </p>
                        <p className={`text-blue-600 font-bold`}>
                          {product?.productFor.sell.vat} %
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/login")}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {activeTab === "service" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* AMC Plans (with radio toggle) */}
                    <div className="relative rounded-xl border p-6 border-gray-200 bg-white">
                      <h3 className="text-xl font-bold text-blue-800 mb-3">
                        AMC
                      </h3>

                      <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                        <button
                          type="button"
                          onClick={() => setAmcType("amcBasic")}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                            amcType === "amcBasic"
                              ? "bg-white shadow text-blue-600"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          Basic
                        </button>
                        <button
                          type="button"
                          onClick={() => setAmcType("amcGold")}
                          className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                            amcType === "amcGold"
                              ? "bg-white shadow text-blue-600"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          Gold
                        </button>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {product?.productFor?.service?.[amcType]?.benefits?.map(
                          (benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <svg
                                className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          )
                        )}
                      </ul>

                      <div className="mt-4 pt-4 border-t">
                        <p className="text-lg font-bold text-blue-800 mb-3">
                          AED {product?.productFor?.service?.[amcType]?.price}
                        </p>
                        <button
                          onClick={() => navigate("/login")}
                          className="w-full py-2 rounded-lg font-medium transition bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500"
                        >
                          Select AMC Plan
                        </button>
                      </div>
                    </div>

                    {/* MMC Plan */}
                    <div className="relative rounded-xl border p-6 border-gray-200 bg-white">
                      <h3 className="text-xl font-bold text-blue-800 mb-3">
                        MMC
                      </h3>

                      <ul className="space-y-2 mb-4">
                        {product?.productFor?.service?.mmc?.benefits?.map(
                          (benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <svg
                                className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          )
                        )}
                      </ul>

                      <div className="mt-4 pt-4 border-t">
                        <p className="text-lg font-bold text-blue-800 mb-3">
                          AED {product?.productFor?.service?.mmc?.price}
                        </p>
                        <button
                          onClick={() => navigate("/login")}
                          className="w-full py-2 rounded-lg font-medium transition bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500"
                        >
                          Select MMC Plan
                        </button>
                      </div>
                    </div>

                    {/* One-Time Service */}
                    <div className="relative rounded-xl border p-6 border-gray-200 bg-white">
                      <h3 className="text-xl font-bold text-blue-800 mb-3">
                        One-Time Service
                      </h3>

                      <ul className="space-y-2 mb-4">
                        {product?.productFor?.service?.ots?.benefits?.map(
                          (benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <svg
                                className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          )
                        )}
                      </ul>

                      <div className="mt-4 pt-4 border-t">
                        <p className="text-lg font-bold text-blue-800 mb-3">
                          AED {product?.productFor?.service?.ots?.price}
                        </p>
                        <button
                          onClick={() => navigate("/login")}
                          className="w-full py-2 rounded-lg font-medium transition bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500"
                        >
                          Select One-Time
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-sm text-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Premium Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {product?.keyFeatures?.map((feature, index) => (
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

      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-8">
          {product?.longDescription && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Product Description
              </h3>
              <div className="prose prose-sm max-w-none text-gray-600">
                {product.longDescription.split("\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {product?.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-10 py-2"
                >
                  <span className="text-gray-500">{spec.name}:</span>
                  <span className={`font-medium text-gray-500  ${spec.value?"px-2 py-1 bg-blue-50 rounded-md":""} `}>
                    {spec.value}
                  </span>
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
