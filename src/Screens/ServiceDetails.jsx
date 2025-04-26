// import React from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import OceanScene from "../Components/widget/OceanScene";

// const ServiceDetails = () => {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const service = state?.service;

//   if (!service) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-2xl text-gray-600">Service not found</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <OceanScene />
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//             {/* Image Carousel */}
//             <div className="relative h-96">
//               {service.imageUrl.map((url, index) => (
//                 <img 
//                   key={index}
//                   src={url} 
//                   alt={`${service.title} - Image ${index + 1}`}
//                   className="w-full h-full object-cover absolute top-0 left-0"
//                   style={{ display: index === 0 ? 'block' : 'none' }}
//                 />
//               ))}
//             </div>

//             <div className="p-8">
//               {/* Title and Description */}
//               <h1 className="text-3xl font-bold text-blue-900 mb-4">
//                 {service.title}
//               </h1>
              
//               <div className="prose max-w-none mb-8">
//                 <h2 className="text-2xl font-semibold text-blue-800 mb-3">
//                   {service.detailedHeading}
//                 </h2>
//                 <div className="text-gray-700">
//                   {service.detailedDescription}
//                 </div>
//               </div>

//               {/* Features */}
//               {service.features && service.features.length > 0 && (
//                 <div className="mt-8">
//                   <h2 className="text-2xl font-semibold text-blue-800 mb-6">
//                     Key Features
//                   </h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {service.features.map((feature) => (
//                       <div 
//                         key={feature.featureId} 
//                         className="bg-gray-50 p-4 rounded-lg"
//                       >
//                         <h3 className="text-lg font-semibold text-blue-700 mb-2">
//                           {feature.title}
//                         </h3>
//                         <p className="text-gray-600">
//                           {feature.description}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ServiceDetails;




import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const service = state?.service;

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-2xl text-blue-800">Service not found</div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50">
      {/* Hero Banner with Blue Overlay */}
      <div style={{backgroundImage: `url(https://img.freepik.com/free-photo/water-background_23-2147795240.jpg?t=st=1745670394~exp=1745673994~hmac=718dbfd7782934235e4b871cdf6127cd30d5bfa8ce91996f7ac41b093bfd45aa&w=1380)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="relative h-96 w-full flex flex-row-reverse items-center justify-around overflow-hidden bg-blue-200 object-fill">
        {service.imageUrl.length > 0 ? (
          <img
            src={service.imageUrl[0]} 
            alt={service.title}
            className="w-auto h-60 "
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{service.title}</h1>
          </div>
        )}
        {/* <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex items-center justify-center"> */}
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-blue-800 max-w-2xl mx-auto">
            {stripHtmlTags(service.shortDescription)}
            </p>
          </div>
        {/* </div> */}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Images Grid */}
        {service.imageUrl.length > 1 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Our Service in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.imageUrl.slice(1).map((url, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg border border-blue-100">
                  <img
                    src={url}
                    alt={`${service.title} - Example ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-medium">
                      {service.title} - Example {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Description */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <div className="prose prose-blue max-w-none mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              {service.detailedHeading || 'About Our Service'}
            </h2>
            <div 
              className="text-blue-800"
              dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
            />
          </div>
        </div>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 border border-blue-200">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                Key Features
              </h2>
              <p className="text-xl text-blue-700">
                What makes our service stand out
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-100"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg mr-4">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-blue-700">
                        {stripHtmlTags(feature.description)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
