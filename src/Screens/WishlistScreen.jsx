import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaArrowLeft, FaTrash, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import useWishlistStore from '../Context/WishlistContext';

const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, []);

 const handleDelete = async(productId) => {
   await removeFromWishlist(productId);
    fetchWishlist();
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };


  const moveToCart = async (productId) => {
    try {
      await axios.post('/api/cart', { productId });
      removeFromWishlist(productId);
      navigate('/cart');
    } catch (err) {
      console.error('Error moving to cart:', err);
    }
  };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h3 className="text-lg font-medium text-red-600 mb-4">Error Loading Wishlist</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (wishlist?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <FaRegHeart className="mx-auto text-5xl text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-500 mb-4">
            You haven't added any items to your wishlist yet. Start exploring our products!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaHeart className="text-red-500 mr-2" />
            My Wishlist ({wishlist?.length})
          </h1>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist?.map((item) => (
            <div
              key={item.id}
           
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div  className="relative">
                <img
                  src={item?.images?.[0]?.imageUrl || 'https://via.placeholder.com/300'}
                  alt={item?.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  
                
                />
                <button
                  onClick={() => handleDelete(item.productId)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <FaTrash className="text-gray-500" />
                </button>
              </div>

              <div className="p-4">
                <h3
                  className="font-medium text-gray-900 mb-1 cursor-pointer hover:text-blue-600 line-clamp-2"
              
                >
                  {item?.name}
                </h3>
                {
                  item?.isActive == true ? (
                      <div className="flex items-center mb-3">
                  {item.productFor?.sell?.discountPrice ? (
                    <>
                      <span className="text-lg font-bold text-gray-900">
                        AED {item?.productFor?.sell?.discountPrice}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        AED {item?.productFor?.sell?.actualPrice}
                      </span>
                    </>
                  ) : (
                    <>
                     <span className="text-lg font-bold text-gray-900">
                        AED {item?.productFor?.rent?.discountPrice}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        AED {item?.productFor?.rent?.monthlyPrice}
                      </span>
                      </>
                  )}

                </div>
                  ):
                  ""

                }
                

                <button
                   onClick={ item.isActive==true ?() => handleProductClick(item) : null}
                  className="w-full flex items-center justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  
                  {item.isActive==false ? "Not Available" : "Move to Cart"   }
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistScreen;