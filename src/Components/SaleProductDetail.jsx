import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GiWaterSplash } from "react-icons/gi";
import { FaWater, FaTools, FaCogs, FaShieldAlt, FaTint, FaCheckCircle, FaSlidersH, FaBolt } from 'react-icons/fa';


const ProductDetail = () => {
  const { name } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [showServiceOption, setShowServiceOption] = useState(false)
  const [newReview, setNewReview] = useState({ user: "", comment: "" });
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


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.user && newReview.comment) {
      setAllReviews([...allReviews, newReview]);
      setNewReview({ user: "", comment: "" });
    }
  };

  if (!product) {
    return <div className="text-center mt-14">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white mt-0 rounded-xl ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mt-14  ">

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full col-span-1 object-cover rounded-lg shadow"
          />
        </div>


        <div className="h-[80%] flex flex-col gap-2  col-span-2 ">
          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:items-center">
            <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center">

              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-gray-400 mt-1 text-sm">
                {product.category} | <span className="font-medium">{product.brand}</span>
              </p>
            </div>

            <div className="flex items-center gap-1">{renderStars(product.rating)} ({product.rating} / 5)</div>

          </div>




          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-2">
            <div className="bg-white shadow-md rounded-xl p-6 border">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Rent</h2>
              <div className="space-y-2">
                <p className="font-semibold"><span className="font-semibold text-gray-400">Actual Price:</span  > 1000 AED</p>
                <p className="font-semibold"><span className="font-semibold text-gray-400">Discount Price:</span > 800 AED</p>
                <p className="font-semibold"><span className="font-semibold text-gray-400">+ VAT 5%:</span > 50 AED</p>
              </div>
              <button onClick={() => navigate('/waterfilterSubscription')} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                Rent Now
              </button>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border">
              <h2 className="text-xl font-semibold mb-4 text-green-700">Sell</h2>
              <div className="space-y-2">
                <p className="font-semibold"><span className="font-semibold text-gray-400">Actual Price:</span  > 1000 AED</p>
                <p className="font-semibold"><span className="font-semibold text-gray-400">Discount Price:</span > 800 AED</p>
                <p className="font-semibold"><span className="font-semibold text-gray-400">+ VAT 5%:</span > 50 AED</p>
              </div>
              <button onClick={() => navigate('/waterfilterSubscription')} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                Buy Now
              </button>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border">
              <h2 className="text-xl font-semibold mb-4 text-purple-700">Service</h2>
              <div className="space-y-2">
                <p className="font-semibold"><span className="font-semibold text-gray-400">Actual Price:</span  > 1000 AED</p>
                <p className="font-semibold"><span className="font-semibold text-gray-400">Discount Price:</span > 800 AED</p>
                <p className="font-semibold"><span className="font-semibold text-gray-400">+ VAT 5%:</span > 50 AED</p>
              </div>
              <button onClick={() => setShowServiceOption(!showServiceOption)} className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
                {showServiceOption ? " Hide Option" : "    Select Options"}
              </button>
            </div>
          </div>







          {/* <div className="mt-6 grid grid-cols-2 gap-4">
            <button onClick={() => navigate("/waterfilterSubscription")} className="px-6 py-2 bg-[#3a7bd5] text-white rounded-lg ">Buy Now</button>
            <button className="px-6 py-2 bg-[#00d0ffa3] text-white rounded-lg bg-opacity-55 ">Add to Cart</button>
          </div> */}
        </div>
      </div>

      {/* User Reviews */}
      {/* {allReviews.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">User Reviews:</h3>
          <ul className="space-y-2 max-h-40 overflow-auto">
            {allReviews.map((review, index) => (
              <li key={index} className="border-b pb-2">
                <p className="text-sm text-gray-700">"{review.comment}"</p>
                <p className="text-xs text-gray-500">- {review.user}</p>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Review Form */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Add Your Review:</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Your name"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
            required
          />
          <textarea
            placeholder="Write your comment..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 border rounded-md text-sm"
            rows={3}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Submit Review
          </button>
        </form>
      </div> */}

      {showServiceOption && (<>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          <div className="bg-gray-50 shadow-md rounded-xl p-6 border border-blue-500 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">One Time</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Quick problem resolution</li>
              <li>No long-term commitments</li>
              <li>Ideal for small fixes</li>
              <li>Pay only for what you need</li>
            </ul>
            <h5 className="text-base font-bold text-blue-800">Price: 202 AED</h5>
            <button onClick={() => navigate('/waterfilterSubscription')} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
              Select This
            </button>
          </div>

          <div className="bg-gray-50 shadow-md rounded-xl border-green-500 p-6 border hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-green-700 mb-3">MMC</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Monthly Maintenance Coverage</li>
              <li>Priority Support</li>
              <li>Discount on parts & services</li>
              <li>Ideal for regular checkups</li>
            </ul>
            <h5 className="text-base font-bold text-green-800">Price: 800 AED</h5>
            <p className="text-sm text-gray-500">+ VAT 5%: 50 AED</p>
            <button onClick={() => navigate('/waterfilterSubscription')} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
              Select This
            </button>
          </div>

          {/* AMC Service */}
          <div className="bg-gray-50 shadow-md rounded-xl p-6 border-purple-500 border hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-purple-700">AMC</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="amc"
                    value="gold"
                    className="accent-purple-600 w-4 h-4"
                  />
                  Gold
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    name="amc"
                    value="basic"
                    className="accent-purple-600 w-4 h-4"
                  />
                  Basic
                </label>
              </div>
            </div>

            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Annual Service Commitment</li>
              <li>Free periodic visits</li>
              <li>24/7 support line</li>
              <li>Best value for long-term users</li>
            </ul>
            <h5 className="text-base font-bold text-purple-800">Price: 800 AED</h5>
            <p className="text-sm text-gray-500">+ VAT 5%: 50 AED</p>
            <button onClick={() => navigate('/waterfilterSubscription')} className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
              Select This
            </button>
          </div>
        </div>

      </>)}

      {
        product.features && (
          <div className="mt-6 md:mt-10 ">
            <h3 className="text-2xl md:text-3xl  font-bold mb-8 text-blue-900 text-center">Key Features</h3>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2  text-sm text-gray-700 gap-4">
              {product.features.map((feature, i) => (
                <div className="bg-blue-100 rounded-xl" key={i}>
                  <div className=" h-[20vh] rounded-lg flex flex-col gap-4 justify-center items-center ">
                    <span className="text-3xl md:text-7xl text-blue-900 " >{getFeatureIcon(feature)}</span>
                    <h3 className="text-base md:text-xl font-bold text-blue-900 " >{feature}</h3>
                  </div>
                  <ul className=" ">
                    <li className="p-3  md:text-base text-sm bg-blue-50 m-2 rounded-xl ">The multiple purification process In-tank ensures that the water is pure and suitable for drinking.</li>
                    <li className="p-2  md:text-base text-sm bg-blue-50 m-2 rounded-xl ">Purifiers make water pure and healthy, meeting drinking water standards of IS:10500.</li>
                    <li className="p-2  md:text-base text-sm bg-blue-50 m-2 rounded-xl ">The TDS control valve which enables the desired TDS level to be controlled to keep essential nutritional value of purified water intact.</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mt-6">

        {product.longDescription && (
          <div className=" border p-2 rounded-lg bg-blue-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Description:</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line md:text-left text-justify ">{product.longDescription}</p>
          </div>
        )}

        <div className=" border p-2 rounded-lg bg-blue-50">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Specifications:</h3>
          <ul className="text-sm text-gray-700 grid grid-cols-2 gap-2">
            <li><span className="font-medium">Capacity:</span> {product.capacity}</li>
            <li><span className="font-medium">Power:</span> {product.powerUsage}</li>
            <li><span className="font-medium">Material:</span> {product.material}</li>
            <li><span className="font-medium">Warranty:</span> {product.warranty}</li>
            <li><span className="font-medium">Dimensions:</span> {product.dimensions}</li>
            <li><span className="font-medium">Weight:</span> {product.weight}</li>
            <li><span className="font-medium">Installation:</span> {product.installationType}</li>
            <li><span className="font-medium">Stock:</span> {product.stock}</li>
          </ul>
        </div>

      </div>

    </div >
  );
};

export default ProductDetail;
