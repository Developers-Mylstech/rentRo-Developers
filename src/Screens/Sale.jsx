import React, { useState } from "react";
import OceanScene from "../Components/OceanScene";
import BottomNav from "../Components/BottomNav";
import notFount from '../assets/notfound.png'


// imgaes import 
import Domestic from '../assets/Rent/Domestic.png'
import Commercial  from '../assets/Rent/Commercial .png'
import Threeinone  from '../assets/Rent/Threeinone.png'
import WaterCooler   from '../assets/Rent/WaterCooler.png'
import WaterDispenser   from '../assets/Rent/WaterDispenser.png'
import Industrial   from '../assets/Rent/Industrial.png'
import ScrollToTopButton from "../Components/ScrollToTopButton";



const products = [
  {
    image: Domestic,
    name: "Domestic",
    category: "Domestic",
    brand: "Rent RO",
    price: 50,
    rating: 4,
  },
  {
    image: Commercial ,
    name: "Commercial",
    category: "Commercial",
    brand: "Kent RO",
    price: 100,
    rating: 5,
  },
  {
    image:Industrial ,
    name: "Industrial",
    category: "Industrial",
    brand: "Aqua Pro",
    price: 50,
    rating: 3,
  },
  {
    image: WaterCooler,
    name: "Water Cooler",
    category: "Water Cooler",
    brand: "Waterlogic",
    price: 50,
    rating: 4,
  },
  {
    image: WaterDispenser,
    name: "Water Filter",
    category: "Accessories",
    brand: "Culligan",
    price: 50,
    rating: 5,
  },
  {
    image: Threeinone,
    name: "3 in 1 System",
    category: "Appliances",
    brand: "Super General",
    price: 10,
    rating: 4,
  },
];

const Sale = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // Filter products based on selected category & brand
  const filteredProducts = products.filter((product) => {
    return (
      (selectedBrand === "" || product.brand === selectedBrand) &&
      (selectedCategory === "" || product.category === selectedCategory)
    );
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.rating - a.rating;
      case "rating":
        return b.rating - a.rating;
      case "low-to-high":
        return a.price - b.price;
      case "high-to-low":
        return b.price - a.price;
      default:
        return 0; // Default order (latest)
    }
  });

  return (
    <>
    <OceanScene/>
    
    <div className="font-sans bg-gray-50 min-h-screen py-10">
      {/* Filter and Sort Options */}
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between  gap-4 items-start bg-white p-4 rounded-lg shadow-md mb-6 mt-18">
        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 hover:bg-blue-100"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="Rent RO">Rent RO</option>
          <option value="Kent RO">Kent RO</option>
          <option value="Aqua Pro">Aqua Pro</option>
          <option value="Waterlogic">Waterlogic</option>
          <option value="Culligan">Culligan</option>
          <option value="Super General">Super General</option>
          <option value="Aquaguard">Aquaguard</option>
          <option value="Blue Water">Blue Water</option>
        </select>

        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 hover:bg-blue-100"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Domestic">Domestic</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Water Cooler">Water Cooler</option>
          <option value="Dispenser">Dispenser</option>
          <option value="Chillers">Chillers</option>
          <option value="Appliances">Appliances</option>
          <option value="Accessories">Accessories</option>
          <option value="Water Tanker">Water Tanker</option>
        </select>

        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 hover:bg-blue-100"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Sort by Latest</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="rating">Sort by Average Rating</option>
          <option value="low-to-high">Sort by Price: Low to High</option>
          <option value="high-to-low">Sort by Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="flex justify-center item items-center mx-auto">
              <div className="flex justify-center item items-center flex-wrap mx-auto gap-10">
                  {sortedProducts.length > 0 ? (
                    sortedProducts.map((product, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-64 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-gray-700">AED {product.price.toFixed(2)}</p>
                          <div className="flex mt-2">
                        {[...Array(product.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.176-6.545L.205 9.553l6.57-1.012L10 2l2.225 6.541 6.57 1.012-4.703 3.09 1.176 6.545z" />
                          </svg>
                        ))}
                      </div>
                        </div>
                        
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-[30vh] w-[95vw]">
                      <img src={notFount} alt="Not Found" className="md:h-52 w-auto h-28" />
                    </div>
                  )}
                </div>
              </div>
    </div>
    <BottomNav/>
    <ScrollToTopButton/>
    </>
  );
};

export default Sale;
