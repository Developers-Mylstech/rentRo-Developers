import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function ProductBybrands() {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [brandInfo, setBrandInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axiosInstance.get(`/products/brand/${brandId}`);
        
        if (response.data) {
          setProducts(response.data);
          // Get brand info from first product (assuming all products have same brand)
          if (response.data.data.length > 0) {
            setBrandInfo(response.data.data[0].brand);
          }
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || 'Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchProducts();
    }
  }, [brandId]);

    const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };

  const getProductPrice = (product) => {
    if (product.productFor?.sell) {
      return product.productFor.sell.discountPrice || product.productFor.sell.actualPrice;
    }
    return '--';
   
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm">
          {brandInfo && brandInfo.image && (
            <img 
              src={brandInfo.image.imageUrl} 
              alt={brandInfo.name} 
              className="h-20 mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {brandInfo?.name || `Brand #${brandId}`} Products
          </h1>
          <p className="text-lg text-gray-600">
            Premium quality products for your needs
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Loading products...</span>
          </div>
        )}

        {error && !products && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && products.length == 0 &&  (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">We couldn't find any products for this brand.</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div  key={product.productId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative bg-gray-100 h-48 flex items-center justify-center text-gray-400">
                  {product.images?.length > 0 ? (
                    <img 
                      src={product.images[0].imageUrl} 
                      alt={product.name} 
                      className="h-full w-full object-contain p-4"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTQgMTZsNC41ODUtNC41ODZhMiAyIDAgMDEyLjgyOCAwTDE2IDE2bS0yLTJsMi4zNjUtMi4zNjRhMiAyIDAgMDEyLjgyOCAwTDIwIDE0bS02LTZoLjAxTTYgMjBoMTJhMiAyIDAgMDAyLTJWNmEyIDIgMCAwMC0yLTJINmEyIDIgMCAwMC0yIDJ2MTJhMiAyIDAgMDAyIDJ6IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=';
                      }}
                    />
                  ) : (
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {product.inventory?.stockStatus === "IN_STOCK" ? (
                    <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="absolute top-2 left-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-blue-600 font-medium text-lg">
                        {product.productFor?.sell?.discountPrice && product.productFor?.rent?.discountPrice ?getProductPrice(product)+"AED":"Request Quotation"} 
                      </span>
                      {product.productFor?.sell?.discountPrice && (
                        <span className="text-gray-400 text-sm line-through ml-2">
                          {product.productFor.sell.actualPrice}AED
                        </span>
                      )}
                    </div>
                    <button onClick={()=>handleProductClick(product)} className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductBybrands;