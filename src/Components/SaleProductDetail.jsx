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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mt-14  ">
  
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:h-[80%] h-full object-cover rounded-lg shadow"
          />
        </div>


        <div className="h-[80%] flex flex-col gap-2 ">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-1">
            {product.category} | <span className="font-medium">{product.brand}</span>
          </p>
          <p className="text-xl text-blue-600 mt-3 font-semibold">Price: {product.price}.00 AED</p>

  
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium mb-1">Rating: {product.rating} / 5</p>
            <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
          </div>

            {product.longDescription && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Description:</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line md:text-left text-justify ">{product.longDescription}</p>
            </div>
          )}


          <div className="mt-6">
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

          {/* Features */}
          {/* {product.features && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Key Features:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )} */}


       

        


          <div className="mt-6 grid grid-cols-2 gap-4">
            <button onClick={()=>navigate("/waterfilterSubscription")} className="px-6 py-2 bg-[#3a7bd5] text-white rounded-lg ">Buy Now</button>
            <button className="px-6 py-2 bg-[#00d0ffa3] text-white rounded-lg bg-opacity-55 ">Add to Cart</button>
          </div>
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

{product.features && (
            <div className="mt-6 md:mt-0 ">
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
          )}

    </div>
  );
};

export default ProductDetail;
