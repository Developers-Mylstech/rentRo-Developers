import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsForRQ = ({ products }) => {
  const navigate = useNavigate();
  const filteredProducts = products.filter(
    (product) => product?.productFor?.isAvailableForRequestQuotation
  );

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="md:text-3xl text-xl font-bold text-gray-800 mb-2">Request Quotation</h2>
        <div className="w-24 h-1.5  bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2"></div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Browse our premium selection of products available for customized quotations
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products available</h3>
          <p className="mt-1 text-gray-500">Currently there are no products available for quotation.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative pt-[70%] bg-gray-100">
                <img
                  src={product.images[0]?.imageUrl|| 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                {product.brand?.logo && (
                  <div className="absolute bottom-2 right-2 bg-white p-1 rounded-md shadow-sm">
                    <img
                      src={product.brand.logo}
                      alt={product.brand.name}
                      className="h-6 object-contain"
                    />
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {product.brand?.name || 'N/A'}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleProductClick(product)} 
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsForRQ;