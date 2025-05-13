// import React, { useEffect } from 'react';
// import { useLocation, useParams, useNavigate } from 'react-router-dom';
// import useServiceStore from '../Context/ServiceContext';

// const ServiceDetails = () => {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { loading, error,fetchProductsByService,products } = useServiceStore();
//   const service = state?.service;

//   const stripHtmlTags = (html) => {
//     const tmp = document.createElement("DIV");
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || "";
//   };
//   useEffect(() => {
//     fetchProductsByService(service.ourServiceId);
//   }, [id, fetchProductsByService]);

//   const navigateToProduct = (product) => {
//     navigate(`/product/${product.productId}`, { state: { product } });
//   };

//   const ServiceDetailsSkeleton = () => (
//     <div className="animate-pulse bg-blue-50">
//       <div className="h-96 bg-gray-200 relative">
//         <div className="absolute inset-0 flex items-center justify-between px-10">
//           <div className="w-1/2">
//             <div className="h-12 bg-gray-300 rounded-lg mb-4"></div>
//             <div className="h-6 bg-gray-300 rounded w-3/4"></div>
//           </div>
//           <div className="w-1/3 h-60 bg-gray-300 rounded-lg"></div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="mb-16">
//           <div className="h-10 bg-gray-200 w-1/3 mx-auto mb-8 rounded"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3,4,5].map((i) => (
//               <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-8">
//           <div className="h-8 bg-gray-200 w-1/4 mb-6 rounded"></div>
//           <div className="space-y-4">
//             <div className="h-4 bg-gray-200 rounded w-full"></div>
//             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//             <div className="h-4 bg-gray-200 rounded w-4/6"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <ServiceDetailsSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-blue-50">
//         <div className="text-center p-8">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Service</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => navigate(-1)} 
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!service) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-blue-50">
//         <div className="text-center p-8">
//           <h2 className="text-2xl font-bold text-blue-800 mb-4">Service not found</h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Validate required service properties
//   const hasValidImages = Array.isArray(service.imageUrl) && service.imageUrl.length > 0;
//   const hasValidTitle = typeof service.title === 'string' && service.title.length > 0;
//   const hasValidDescription = typeof service.detailedDescription === 'string';

//   if (!hasValidTitle || !hasValidDescription) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-blue-50">
//         <div className="text-center p-8">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Service Data</h2>
//           <button 
//             onClick={() => navigate(-1)} 
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="bg-blue-50">
//       {/* Hero Banner with Blue Overlay */}
//       <div style={{backgroundImage: `url(https://img.freepik.com/free-photo/water-background_23-2147795240.jpg?t=st=1745670394~exp=1745673994~hmac=718dbfd7782934235e4b871cdf6127cd30d5bfa8ce91996f7ac41b093bfd45aa&w=1380)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="relative md:h-[45vh]  h-[35vh] w-full flex flex-col md:flex-row-reverse items-center md:justify-around justify-center gap-2 overflow-hidden bg-blue-200 object-fill">
//         {service.imageUrl.length > 0 ? (
//           <img
//             src={service.imageUrl} 
//             alt={service.title}
//             className="w-auto md:h-60 h-32 mt-8  "
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 flex  items-center justify-center">
//             <h1 className=" text-lg md:text-4xl  font-bold text-white">{service?.title}</h1>
          
//           </div>
//         )}
//         {/* <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center"> */}
//           <div className="text-center px-4">
//             <h1 className="text-xl md:text-4xl  font-bold text-blue-900 mb-2">
//               {service.title}
        
//             </h1>
//             <p className="md:text-xl md:block  text-sm  text-blue-800 max-w-2xl mx-auto">
//             {stripHtmlTags(service.shortDescription)}
//             </p>
//           </div>
//         {/* </div> */}
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    

//         {/* Detailed Description */}
//         <div className="mb-16 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
//           <div className="prose prose-blue max-w-none mx-auto">
//             <h2 className="text-3xl font-bold text-blue-900 mb-6">
//               {service.detailedHeading || 'About Our Service'}
//             </h2>
//             <div 
//               className="text-blue-800"
//               dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
//             />
//           </div>
//         </div>

//         <div>
//         {products?.length > 0 && (
//   <div className="mb-16 px-4 sm:px-0">
//     <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
//       Related Products
//     </h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <div 
//           key={product.productId}
//           onClick={() => navigateToProduct(product)}
//           className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden"
//         >
//           {/* Image with hover effect */}
//           <div className="relative aspect-square overflow-hidden">
//             <img 
//               src={product.images?.[0]?.imageUrl || 'https://via.placeholder.com/300'} 
//               alt={product.title}
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://via.placeholder.com/300';
//               }}
//             />
//             {/* Hover overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//               <span className="text-white font-medium text-sm bg-blue-600 px-3 py-1 rounded-full">
//                 View Details
//               </span>
//             </div>
//           </div>

//           {/* Product info */}
//           <div className="p-5">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
//               {product.title}
//             </h3>
//             <p className="text-gray-600 text-sm mb-3 line-clamp-3">
//               {stripHtmlTags(product.description)}
//             </p>
            
//             <div className="flex justify-between items-center">
//               <div>
//                     {product.productFor?.sell?.discountPrice ? (
//                       <>
//                         <span className="text-sm font-bold text-gray-900">
//                           AED {product?.productFor?.sell?.discountPrice}
//                         </span>
//                         {product?.productFor?.sell?.discountPrice <
//                           product?.productFor?.sell?.actualPrice && (
//                           <span className="ml-2 text-sm text-gray-500 line-through">
//                             AED {product?.productFor?.sell?.actualPrice}
//                           </span>
//                         )}
//                       </>
//                     ) : product.productFor?.rent?.discountPrice ? (
//                       <span className="text-sm font-bold text-gray-900">
//                         AED {product?.productFor?.rent?.discountPrice} <span className='text-[10px]'>/month</span>
//                       </span>
//                     ) :null}
//                   </div>
//               {product.category && (
//                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                   {product.brand?.name}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
//         </div>

//         {/* Features */}
//         {service.features && service.features.length > 0 && (
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 border border-blue-200">
//             <div className="max-w-3xl mx-auto text-center mb-12">
//               <h2 className="text-3xl font-bold text-blue-900 mb-4">
//                 Key Features
//               </h2>
//               <p className="text-xl text-blue-700">
//                 What makes our service stand out
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {service.features.map((feature, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-100"
//                 >
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
//                       <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-blue-900 mb-2">
//                         {feature.title}
//                       </h3>
//                       <p className="text-blue-700">
//                         {stripHtmlTags(feature.description)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;

import React, { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useServiceStore from '../Context/ServiceContext';
import { FiArrowRight, FiCheckCircle, FiChevronLeft } from 'react-icons/fi';

const ServiceDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loading, error, fetchProductsByService, products } = useServiceStore();
  const service = state?.service;

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  useEffect(() => {
    fetchProductsByService(service?.ourServiceId);
  }, [id, fetchProductsByService, service?.ourServiceId]);

  const navigateToProduct = (product) => {
    navigate(`/product/${product.productId}`, { state: { product } });
  };

  // Loading Skeleton
  const ServiceDetailsSkeleton = () => (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-96 bg-gradient-to-r from-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-10 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-5/6"></div>
            </div>
            <div className="w-full md:w-1/3 h-64 bg-gray-300 rounded-xl mt-8 md:mt-0"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <ServiceDetailsSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Service</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiChevronLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiChevronLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Validate service data
  const hasValidImages = Array.isArray(service.imageUrl) && service.imageUrl.length > 0;
  const hasValidTitle = typeof service.title === 'string' && service.title.length > 0;
  const hasValidDescription = typeof service.detailedDescription === 'string';

  if (!hasValidTitle || !hasValidDescription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Service Data</h2>
          <p className="text-gray-600 mb-6">The service information is incomplete.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiChevronLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/80 z-10"></div>
        <div 
          className="h-[50vh] md:h-[70vh] w-full bg-cover bg-center"
          style={{ 
            backgroundImage:
              `url(https://images.unsplash.com/photo-1614850523011-8f49ffc73908?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` 
              
              // : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)'
              
          }}
        ></div>
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6">
            <div className="w-full flex flex-col-reverse md:flex-row  justify-end items-center md:justify-around">
              <div className="md:w-2/3 text-white">
                <h1 className="text-2xl md:text-5xl font-bold md:mb-6 mb-2 leading-tight">
                  {service.title}
                </h1>
                <p className="text-lg md:text-2xl md:block hidden md:mb-8 mb-2 text-blue-100">
                  {stripHtmlTags(service.shortDescription)}
                </p>
                <button className="px-8 py-3 md:block hidden bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                  Get Started
                </button>
              </div>
              
       
                <div className=" md:block w-[70%] md:w-[25%]  md:mt-10">
                  <div className="py-4 rounded-xl ">
                    <img 
                      src={service.image?.imageUrl} 
                      alt={service.title}
                      className="w-full h-auto rounded-lg "
                    />
                  </div>
                </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto max-w-7xl px-6 py-16 mt-2 relative z-30">
        {/* About Section */}
     <div className="bg-white border-2 border-blue-700 rounded-3xl shadow-xl hover:shadow-blue-200 transition-shadow duration-300 overflow-hidden mb-16">
  <div className="px-4 py-8 sm:px-8 md:px-12 lg:px-16">

    {/* Header Line & Label */}
    <div className="flex items-center mb-6 md:mb-10">
      <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
      <span className="ml-4 text-blue-600 font-semibold tracking-wide uppercase text-sm md:text-base">
        About Our Service
      </span>
    </div>

    {/* Heading */}
    <h2 className="text-xl  md:text-3xl font-semibold text-gray-800 leading-tight md:mb-6 mb-3">
      {service.detailedHeading || 'Comprehensive Service Solutions'}
    </h2>

    {/* Description */}
    <div
      className="prose prose-sm md:text-base text-sm sm:prose md:prose-lg lg:prose-xl max-w-none text-gray-700"
      dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
    />
  </div>
</div>


        {/* Features Section */}
        {service.features && service.features.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <div className='flex justify-start items-center w-full'>
                <p className="h-1.5  w-24  bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mx-auto mb-4 "></p>
              </div>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                We deliver exceptional service with these key benefits
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white md:p-8 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <FiCheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="md:text-xl text-base font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 md:text-base text-sm">
                    {stripHtmlTags(feature.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {products?.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="md:text-3xl text-xl font-bold text-gray-900">Related Products</h2>
                <p className="text-gray-600">Products that complement this service</p>
              </div>
              {/* <button 
                onClick={() => navigate('/products')}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                View all <FiArrowRight className="ml-2" />
              </button> */}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div 
                  key={product.productId}
                  onClick={() => navigateToProduct(product)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 "
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={product.images?.[0]?.imageUrl || 'https://via.placeholder.com/300'} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                   
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {stripHtmlTags(product.description)}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        {product.productFor?.sell?.discountPrice ? (
                          <>
                            <span className="text-base font-bold text-gray-900">
                              AED {product?.productFor?.sell?.discountPrice}
                            </span>
                            {product?.productFor?.sell?.discountPrice <
                              product?.productFor?.sell?.actualPrice && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                AED {product?.productFor?.sell?.actualPrice}
                              </span>
                            )}
                          </>
                        ) : product.productFor?.rent?.discountPrice ? (
                          <span className="text-base font-bold text-gray-900">
                            AED {product?.productFor?.rent?.discountPrice} <span className='text-xs'>/month</span>
                          </span>
                        ) : null}
                      </div>
                      {product.brand?.name && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.brand.name}
                        </span>
                      )}

                    </div>
                      <button 
                        onClick={() => navigateToProduct(product)}
                        className=" text-white px-3 py-2 bg-blue-700 rounded-lg w-full flex items-center justify-center my-2"
                      > 
                       View Details <FiArrowRight className="ml-2" />
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our {service.title} service
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Request a Quote
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceDetails;