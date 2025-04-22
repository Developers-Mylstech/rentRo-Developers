import React, { useEffect, useState } from "react";
import OceanScene from "../Components/widget/OceanScene";
import ProductList from "../Components/listing/ProductListing";
import WaterFilterSubscriptionForm from "../Components/form/WaterFilterSubscriptionForm";

// Images import
import Domestic from "../assets/Rent/Domestic.png";
import Commercial from "../assets/Rent/Commercial .png";
import Threeinone from "../assets/Rent/Threeinone.png";
import WaterCooler from "../assets/Rent/WaterCooler.png";
import WaterDispenser from "../assets/Rent/WaterDispenser.png";
import Industrial from "../assets/Rent/Industrial.png";
import useProductStore from "../Context/ProductContext";



const Sale = () => {
  const { fetchProducts, products } = useProductStore()
  useEffect(() => {
    fetchProducts()

  }, [])
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");

 

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };
  


  return (
    <>
      <OceanScene />
      <div className="font-sans bg-gray-50 min-h-screen py-10">
        {/* Filter and Sort Options */}
        {/* <div className="container mx-auto flex flex-col md:flex-row sm:justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6 mt-18 w-full space-y-2 sm:space-y-0 sm:space-x-4">
          <select
            className="w-full sm:flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 hover:bg-blue-100"
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
            className="w-full sm:flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 hover:bg-blue-100"
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
            className="w-full sm:flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform transform hover:scale-105 hover:bg-blue-100"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">Sort by Latest</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Average Rating</option>
            <option value="low-to-high">Sort by Price: Low to High</option>
            <option value="high-to-low">Sort by Price: High to Low</option>
          </select>
        </div> */}

        {/* Product Listing */}
        <ProductList products={products} />
      </div>

      <WaterFilterSubscriptionForm/>
      

      {/* <BottomNav /> */}
      {/* <ScrollToTopButton /> */}
    </>
  );
};

export default Sale;
