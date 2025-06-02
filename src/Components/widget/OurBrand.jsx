

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axiosInstance from "../../utils/axiosInstance"; // Adjust import path
import { useNavigate } from "react-router-dom";

function OurBrand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get("/brands"); // Adjust API endpoint
        setBrands(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch brands");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

 

const handleBrandClick = async (brand) => {
  // Validate brand object exists
  if (!brand) {
    alert("Brand object is required");
    return;
  }

  // Validate required brand properties
  if (!brand.brandId ) {
    console.error("Brand is missing required properties", brand);
    return;
  }

  try {
    console.log(brand,' has been clicked');
    // Encode the brand name for URL safet    
    navigate(`/brands/${brand?.brandId}`);
    
  } catch (error) {
    console.error("Error handling brand navigation:", error);
   alert("Failed to navigate to brand page");
  }
};

  if (loading) {
    return (
      <div className="my-12">
        <h2 className="text-center text-3xl font-bold my-8 mb-10 ">
          Brands We Serve
        </h2>
        <div className="w-24 h-1.5  bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2 my-8 mb-10"></div>
        <div className="flex justify-center py-8">
          <p>Loading brands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-12">
        <h2 className="text-center md:text-3xl text-xl font-bold  ">
         Brands We Serve

        </h2>
        <div className="w-24 h-1.5  bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2 my-8 mb-10"></div>
        <div className="flex justify-center py-8 text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (brands?.length === 0) {
    return (
      <div className="my-12">
        <h2 className="text-center text-3xl font-bold ">
           Brands We Serve
        </h2>
        <div className="w-24 h-1.5  bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2  my-8 mb-10"></div>

        <div className="flex justify-center py-8">
          <p>No brands available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12">
      <h2 className="text-center md:text-3xl text-xl font-bold  ">
         Brands We Serve
      </h2>
       <div className="w-24 h-1.5  bg-gradient-to-r rounded-full from-blue-500 to-cyan-400 mx-auto mt-2 mb-5 md:mb-10"></div>
      <div className="w-full overflow-hidden whitespace-nowrap pb-4">
        <Marquee 
          speed={50} 
          gradient={false} 
          pauseOnHover={true} 
          play={true} 
          direction="left"
          className="cursor-grab active:cursor-grabbing"
        >
          {brands.map((brand) => (
            <img
              onClick={() => handleBrandClick(brand)}
              key={brand?.brandId}
              src={brand?.image?.imageUrl}
              alt={brand?.name}
              className="h-8 md:h-12 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain cursor-pointer"
             
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default OurBrand;

