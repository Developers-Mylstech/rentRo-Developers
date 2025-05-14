

// import React from "react";
// import Marquee from "react-fast-marquee";
// import Aquaguard from "../../assets/OurBrand/Aquaguard.png";
// import Aquapro from "../../assets/OurBrand/Aquapro.png";
// import Bluewater from "../../assets/OurBrand/Bluewater.png";
// import Culligan from "../../assets/OurBrand/Culligan.png";
// import Kent from "../../assets/OurBrand/Kent.png";
// import WaterLogic from "../../assets/OurBrand/WaterLogic.png";

// function OurBrand() {
//   const brands = [
//     { id: 1, name: "Blue Water", image: Bluewater },
//     { id: 2, name: "Aqua Pro", image: Aquapro },
//     { id: 3, name: "Culligan", image: Culligan },
//     { id: 4, name: "Kent Water", image: Kent },
//     { id: 5, name: "Water Logic", image: WaterLogic },
//     { id: 6, name: "Aquaguard", image: Aquaguard },
//   ];

//   return (
//     <div className="my-12">
//       <h2 className="text-center text-2xl font-bold my-8 mb-10 text-blue-800">
//         Our Brands
//       </h2>
//       <div className="w-full overflow-hidden whitespace-nowrap pb-4">
//         <Marquee 
//           speed={50} 
//           gradient={false} 
//           pauseOnHover={true} 
//           play={true} 
//           direction="left"
//           className="cursor-grab active:cursor-grabbing"
//         >
//           {brands.map((brand) => (
//             <img
//               key={brand.id}
//               src={brand.image}
//               alt={brand.name}
//               className="h-10 md:h-16 md:mx-14 lg:mx-20 xl:mx-24 mx-6 w-auto object-contain cursor-pointer"
//             />
//           ))}
//         </Marquee>
//       </div>
//     </div>
//   );
// }

// export default OurBrand;


import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axiosInstance from "../../utils/axiosInstance"; // Adjust import path

function OurBrand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

