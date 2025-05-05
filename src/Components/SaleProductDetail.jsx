import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaCheck, 
  FaCheckCircle,
  FaExpand,
  FaCompress,
  FaPlus,
  FaMinus
} from "react-icons/fa";
import useCartStore from "../Context/CartContext";
import useAuthStore from "../Context/AuthContext";
import AddToCartNotification from "./widget/AddToCartNotification";

const CustomCarousel = ({ 
  images, 
  height = "60vh",
  autoPlay = false,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showDots = true,
  showFullscreen = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);



  // Auto-play functionality with pause on hover
  useEffect(() => {
    let interval;
    if (autoPlay && images.length > 1 && !isHovered && !isFullscreen) {
      interval = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval, images.length, isHovered, isFullscreen]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(console.log);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.log);
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      className={`relative w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Container */}
      <div 
        className={`relative overflow-hidden ${isFullscreen ? 'h-screen w-screen' : ''}`}
        style={{ height: isFullscreen ? '100%' : height }}
      >
        {/* Slides */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className={`object-contain w-full h-full ${isFullscreen ? 'max-h-screen' : ''}`}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute  left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

   
       
        {/* Slide Counter */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnail Navigation */}
      {showThumbnails && images.length > 1 && !isFullscreen && (
        <div className="flex mt-4 space-x-2 overflow-x-auto py-2 px-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2  transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-blue-500 scale-105' 
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicators */}
      {showDots && images.length > 1 && !isFullscreen && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { name } = useParams();
  const location = useLocation();
  const { token } = useAuthStore();
  const product = location.state?.product;
  const navigate = useNavigate();


  const [localCartItems, setLocalCartItems] = useState([]);
  const [localTotalAmount, setLocalTotalAmount] = useState(0);
  const [notificationProduct, setNotificationProduct] = useState(null);





  const addToCartLocally = () => {
    const localSaved ={
      productId:product.productId,
      productType:activeTab.toUpperCase(),
      quantity:quantity,

     
    };

    setLocalCartItems(localSaved);

    console.log(localSaved,"localy Saved");
    

    const updatedCartItems = [...localCartItems,localSaved];
    setLocalCartItems(updatedCartItems);
    localStorage.setItem('cartItemsOffline', JSON.stringify(updatedCartItems));
    setNotificationProduct(product);
  }

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItemsOffline');
    if (storedCartItems) {
      setLocalCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  
  // Determine which tab should be active initially based on availability
  const getInitialActiveTab = () => {
    if (product?.productFor?.rent?.discountPrice) return "rent";
    if (product?.productFor?.sell?.discountPrice) return "sell";
    if (product?.productFor?.service?.amcBasic?.price || 
        product?.productFor?.service?.amcGold?.price || 
        product?.productFor?.service?.mmc?.price || 
        product?.productFor?.service?.ots?.price) return "service";
    return "rent"; // Default fallback
  };
  
  const [activeTab, setActiveTab] = useState(getInitialActiveTab);
  const [amcType, setAmcType] = useState("amcBasic");
  const [allReviews, setAllReviews] = useState(product?.reviews || []);
  
  // New state variables for rent period and quantity
  const [rentPeriod, setRentPeriod] = useState(1);
  const [quantity, setQuantity] = useState(1);
  // const [rentQuantity, setRentQuantity] = useState(1);
  
  // Get addToCart function from cart store
  const { addToCart } = useCartStore();

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

  // Handle adding to cart
  const handleAddToCart = () => {

    let item = {};
   
    if(activeTab=="rent"){
       item = {
        productId: product.productId,
        productType: "RENT",
        // rentPeriod: rentPeriod,
        quantity: quantity
 
      };
    }else{
      item = {
        productId: product.productId,
        productType: "SELL",
        quantity: quantity
      };
    }
    
    const res = addToCart(item)
    console.log(res,"res");
    setNotificationProduct(product);
     
  };

  useEffect(() => {
    if (activeTab === "rent") {
      setLocalTotalAmount(product?.productFor?.rent?.discountPrice * rentPeriod);
    }
    else {
      setLocalTotalAmount(product?.productFor?.sell?.discountPrice * quantity);
    }
  }, [activeTab]);
 
  return (
    <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        <div className="md:col-span-1 flex items-center justify-center rounded-lg p-4">
            {product.imageUrls.length > 1 ? (
              <CustomCarousel 
                images={product.imageUrls}
                height="60vh"
                width="60%"
                marginHorizontal="auto"
                autoPlay={true}
                autoPlayInterval={3000}
                showThumbnails={true}
                showDots={true}
                showFullscreen={true}
                arrowStyle="solid"
                transition="fade"
              />
            ) : (
              <div className="relative w-full">
                <img
                  src={product.imageUrls[0]}
                  alt={product?.name}
                  className="object-cover rounded-lg mx-auto md:h-[50vh] h-auto w-full"
                />
                {product.imageUrls.length === 1 && (
                  <button 
                    onClick={() => document.documentElement.requestFullscreen().catch(console.log)}
                    className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md"
                  >
                    <FaExpand />
                  </button>
                )}
              </div>
            )}
          </div>


          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                  {product?.name}
                </h1>
                <p className="text-gray-500 mt-1">
                  {product?.category?.name} |{" "}
                  <span className="font-medium text-blue-600">
                    {product?.brand?.name}
                  </span>
                </p>
                <div className="flex gap-1 items-center flex-wrap"><p className="text-gray-500 mt-1 text-xs font-bold px-2 py-1  rounded-lg bg-gray-100 uppercase ">{product?.modelNo}</p><p className="border-l-2 border-gray-300 flex " >{product?.tagNKeywords.map((tag) => (
                  <span key={tag} className="mx-1 px-1 py-1 text-xs text-white rounded-md font-semibold bg-blue-500 ">
                    #{tag}
                  </span>
                ))}
              </p></div>
              </div>
              <div className="flex items-center">
                {/* {renderStars(product.rating)} */}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
              <nav className="">
                {["rent", "sell", "service"].map((tab) => {
                  const isDisabled = (
                    (tab === "sell" && !product?.productFor?.sell?.discountPrice) ||
                    (tab === "rent" && !(product?.productFor?.rent?.discountPrice) ) ||
                    (tab === "service" && !(
                      product?.productFor?.service?.amcBasic?.price ||
                      product?.productFor?.service?.amcGold?.price ||
                      product?.productFor?.service?.mmc?.price ||
                      product?.productFor?.service?.ots?.price
                    ))
                  );

                  return (
                    <button
                      key={tab}
                      onClick={() => !isDisabled && setActiveTab(tab)}
                      // onClick={() =>setActiveTab(tab)}
                      disabled={isDisabled}
                      className={`whitespace-nowrap py-4 w-1/3 px-1 border-b font-medium text-sm ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : isDisabled
                          ? "border-b text-gray-300 cursor-not-allowed"
                          : "border-b text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {isDisabled && " (N/A)"}
                    </button>
                  );
                })}
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
                      {product?.productFor?.rent?.benefits?.map(
                        (benefit, index) => (
                          <div key={index} className="flex items-start">
                            <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                            <p className="text-gray-700">{benefit}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Quantity
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                          disabled={quantity <= 1}
                        >
                          <FaMinus size={14} />
                        </button>
                        <span className="px-4 py-2 text-gray-800 font-medium">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>
                      {/* <span className="text-sm text-gray-500">
                        {product?.productFor?.rent?.stock > 0 
                          ? `${product?.productFor?.rent?.stock} units available` 
                          : "Out of stock"}
                      </span> */}
                    </div>
                  </div>


                  {/* Rental Period Selection */}
                  {/* <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Rental Period
                    </h3>
                    <div className="flex space-x-2 mb-4">
                      {[1, 3, 6, 12].map((months) => (
                        <button
                          key={months}
                          onClick={() => setRentPeriod(months)}
                          className={`px-4 py-2 rounded-lg border transition-all ${
                            rentPeriod === months
                              ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                              : "border-gray-300 text-gray-600 hover:border-blue-300"
                          }`}
                        >
                          {months} {months === 1 ? "Month" : "Months"}
                        </button>
                      ))}
                    </div>
                  </div> */}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Pricing
                    </h3>
                    <div className="grid grid-cols-3  md:gap-4 gap-2 bg-blue-50 rounded-lg md:p-4 p-2">
                      <div className="text-center">
                        <p className="md:text-sm text-xs text-gray-500">Actual Price</p>
                        <p className="text-gray-500 line-through">
                          {product?.productFor?.rent?.monthlyPrice} AED
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="md:text-sm text-xs text-gray-500">Discount Price</p>
                        <p className="text-blue-600 font-bold">
                          {product?.productFor?.rent?.discountPrice} AED
                        </p>
                        <p className="md:text-xs text-[9px] text-gray-500 text-left">per month × {rentPeriod} months</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">+ VAT {product?.productFor?.rent?.vat} %</p>
                        <p className="text-blue-600 font-bold">
                          {product?.productFor?.rent?.vat} %
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-right">
                      <p className="text-lg font-bold text-blue-700">
                        Total: AED {(product?.productFor?.rent?.discountPrice * rentPeriod).toFixed(2)}
                       
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
                  <button
                    onClick={() => token != null ? navigate("/waterfilterSubscription") : navigate("/login")}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Rent Now
                  </button>
                  <button
                    // onClick={handleAddToCart}
                    onClick={() => token != null ? handleAddToCart() : addToCartLocally()}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Add to Cart
                  </button>
                  </div>
                </div>
              )}

              {activeTab === "sell" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Benefits of Purchase
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product?.productFor?.sell?.benefits?.map(
                        (benefit, index) => (
                          <div key={index} className="flex items-start">
                            <FaCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                            <p className="text-gray-700">{benefit}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Quantity
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                          disabled={quantity <= 1}
                        >
                          <FaMinus size={14} />
                        </button>
                        <span className="px-4 py-2 text-gray-800 font-medium">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                          <FaPlus size={14} />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        {product?.productFor?.sell?.stock > 0 
                          ? `${product?.productFor?.sell?.stock} units available` 
                          : "Out of stock"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Pricing
                    </h3>
                    <div className="grid grid-cols-3 gap-4 bg-blue-50 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Actual Price</p>
                        <p className="text-gray-500 line-through">
                          {product?.productFor?.sell?.actualPrice} AED
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Discount Price</p>
                        <p className="text-blue-600 font-bold">
                          {product?.productFor?.sell?.discountPrice} AED
                        </p>
                        <p className="text-xs text-gray-500">per unit × {quantity} units</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">+ VAT</p>
                        <p className="text-blue-600 font-bold">
                          {product?.productFor?.sell?.vat} %
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-right">
                      <p className="text-lg font-bold text-blue-700">
                        Total: AED {(product?.productFor?.sell?.discountPrice * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <button
                    onClick={() => token != null ? navigate("/waterfilterSubscription") : navigate("/login")}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Buy Now
                  </button>
                  <button
                    // onClick={handleAddToCart}
                    onClick={() => token != null ? handleAddToCart() : addToCartLocally()}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-sm hover:from-blue-700 hover:to-cyan-600 transition"
                  >
                    Add to Cart
                  </button>
                  </div>
                </div>
              )}

              {activeTab === "service" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {/* AMC Plans (with radio toggle) */}
                    <div className="relative rounded-xl border p-6 border-gray-200 bg-white flex flex-col">
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

                      <ul className="space-y-2 mb-4 flex-grow">
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

                      <div className="mt-auto pt-4 border-t">
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
                    <div className="relative rounded-xl border p-6 border-gray-200 bg-white flex flex-col">
                      <h3 className="text-xl font-bold text-blue-800 mb-3">
                        MMC
                      </h3>

                      <ul className="space-y-2 mb-4 flex-grow">
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

                      <div className="mt-auto pt-4 border-t">
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
                    <div className="relative rounded-xl border p-6 border-gray-200 bg-white flex flex-col">
                      <h3 className="text-xl font-bold text-blue-800 mb-3">
                        One-Time Service
                      </h3>

                      <ul className="space-y-2 mb-4 flex-grow">
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

                      <div className="mt-auto pt-4 border-t">
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
          <h2 className="text-2xl font-bold text-center border-b border-gray-300 borde- pb-2 text-blue-700 mb-8">
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

      <div className=" bg-white rounded-xl shadow-sm overflow-hidden ">
        <div className="p-6  grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className=" w-full">
            <h3 className="text-xl md:text-2xl font-bold text-blue-700 border-b border-gray-300 pb-2 mb-4 ">
              Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3  ">
              {product?.specifications?.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start py-1 px-2  w-full border-b "
                >
                  <span className="text-gray-500">{spec.name}:</span>
                  <span
                    className={`font-medium text-gray-500  ${
                      spec.value ? " rounded-md" : ""
                    } `}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {product?.longDescription && (
            <div>
              <h3 className="text-xl md:text-2xl  font-bold text-blue-700 border-b border-gray-300 pb-2 mb-4">
                Product Description
              </h3>
              <div className="prose prose-sm max-w-none text-gray-600">
                {product.longDescription.split("\n")?.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

         
        </div>
        <AddToCartNotification
        product={notificationProduct}
        onClose={() => setNotificationProduct(null)}
      />
      </div>
    </div>
  );
};

export default ProductDetail;
