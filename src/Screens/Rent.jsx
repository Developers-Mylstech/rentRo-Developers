import React, { useEffect, useState } from "react";
import OceanScene from "../Components/widget/OceanScene";
import ProductList from "../Components/listing/ProductListing";

// Images import
import Domestic from "../assets/Rent/Domestic.png";
import Commercial from "../assets/Rent/Commercial .png";
import Threeinone from "../assets/Rent/Threeinone.png";
import WaterCooler from "../assets/Rent/WaterCooler.png";
import WaterDispenser from "../assets/Rent/WaterDispenser.png";
import Industrial from "../assets/Rent/Industrial.png";
import useProductStore from "../Context/ProductContext";

const products = [
  {
    id: 1,
    image: Domestic,
    name: "Domestic",
    category: "Domestic",
    brand: "Rent RO",
    price: 50,
    rating: 4,
    shortDescription: "Durable industrial-grade purifier for factories and plants...",
    longDescription: "This durable industrial-grade water purifier is specifically engineered to meet the rigorous demands of factories and large-scale plants. Built with high-quality materials, it ensures long-lasting performance even in harsh working conditions. The system features advanced multi-stage filtration technology to effectively remove impurities, heavy metals, and contaminants, delivering clean and safe water for industrial processes. Its high flow rate and low maintenance design make it an ideal solution for continuous operation. Easy to install and operate, this purifier enhances operational efficiency while ensuring compliance with industry water quality standards.",
    features: ["7-stage purification", "Compact design", "Easy installation", "Mineral guard"],
    capacity: "12 L",
    powerUsage: "36W",
    dimensions: "42 x 28 x 40 cm",
    weight: "6.5 kg",
    material: "Plastic",
    installationType: "Wall-mounted",
    stock: 10,
    warranty: "1 Year",
    reviews: [
      { user: "Amit Sharma", rating: 4, comment: "Good performance, compact size fits my kitchen perfectly." },
      { user: "Sneha Patel", rating: 5, comment: "Water tastes fresh and installation was smooth." }
    ]
  },
  {
    id: 2,
    image: Commercial,
    name: "Commercial",
    category: "Commercial",
    brand: "Kent RO",
    price: 100,
    rating: 5,
    shortDescription: "Durable industrial-grade purifier for factories and plants...",
    longDescription: "This durable industrial-grade water purifier is specifically engineered to meet the rigorous demands of factories and large-scale plants. Built with high-quality materials, it ensures long-lasting performance even in harsh working conditions. The system features advanced multi-stage filtration technology to effectively remove impurities, heavy metals, and contaminants, delivering clean and safe water for industrial processes. Its high flow rate and low maintenance design make it an ideal solution for continuous operation. Easy to install and operate, this purifier enhances operational efficiency while ensuring compliance with industry water quality standards.",
    features: ["25 L/hr capacity", "UV protection", "Auto shut-off", "Built-in TDS controller"],
    capacity: "25 L/hr",
    powerUsage: "60W",
    dimensions: "45 x 35 x 60 cm",
    weight: "12 kg",
    material: "ABS Plastic",
    installationType: "Floor standing",
    stock: 6,
    warranty: "2 Years",
    reviews: [
      { user: "Ravi Singh", rating: 5, comment: "Perfect for our office. Handles high usage well." },
      { user: "Meena Das", rating: 4, comment: "Very effective. Slightly noisy but worth it." }
    ]
  },
  // Repeat similarly for other products...

  // Sample addition for one more product:
  {
    id: 3,
    image: Threeinone,
    name: "Industrial",
    category: "Industrial",
    brand: "Aqua Pro",
    price: 50,
    rating: 3,
    shortDescription: "Durable industrial-grade purifier for factories and plants...",
    longDescription: "This durable industrial-grade water purifier is specifically engineered to meet the rigorous demands of factories and large-scale plants. Built with high-quality materials, it ensures long-lasting performance even in harsh working conditions. The system features advanced multi-stage filtration technology to effectively remove impurities, heavy metals, and contaminants, delivering clean and safe water for industrial processes. Its high flow rate and low maintenance design make it an ideal solution for continuous operation. Easy to install and operate, this purifier enhances operational efficiency while ensuring compliance with industry water quality standards.",
    features: ["100 L/hr", "Pre and post filters", "Rust-proof body", "SS frame"],
    capacity: "100 L/hr",
    powerUsage: "100W",
    dimensions: "75 x 50 x 80 cm",
    weight: "35 kg",
    material: "Stainless Steel",
    installationType: "Floor mounted",
    stock: 4,
    warranty: "2 Years",
    reviews: [
      { user: "Factory Manager", rating: 3, comment: "Durable build but filter replacement cost is high." },
      { user: "Shiv Kumar", rating: 4, comment: "Solid performance, suitable for large operations." }
    ]
  },
  {
    id: 4,
    image: WaterCooler,
    name: "Industrial",
    category: "Industrial",
    brand: "Aqua Pro",
    price: 50,
    rating: 3,
    shortDescription: "Durable industrial-grade purifier for factories and plants...",
    longDescription: "This durable industrial-grade water purifier is specifically engineered to meet the rigorous demands of factories and large-scale plants. Built with high-quality materials, it ensures long-lasting performance even in harsh working conditions. The system features advanced multi-stage filtration technology to effectively remove impurities, heavy metals, and contaminants, delivering clean and safe water for industrial processes. Its high flow rate and low maintenance design make it an ideal solution for continuous operation. Easy to install and operate, this purifier enhances operational efficiency while ensuring compliance with industry water quality standards.",
    features: ["100 L/hr", "Pre and post filters", "Rust-proof body", "SS frame"],
    capacity: "100 L/hr",
    powerUsage: "100W",
    dimensions: "75 x 50 x 80 cm",
    weight: "35 kg",
    material: "Stainless Steel",
    installationType: "Floor mounted",
    stock: 4,
    warranty: "2 Years",
    reviews: [
      { user: "Factory Manager", rating: 3, comment: "Durable build but filter replacement cost is high." },
      { user: "Shiv Kumar", rating: 4, comment: "Solid performance, suitable for large operations." }
    ]
  },
  {
    id: 5,
    image: Industrial,
    name: "Industrial",
    category: "Industrial",
    brand: "Aqua Pro",
    price: 50,
    rating: 3,
    shortDescription: "Durable industrial-grade purifier for factories and plants...",
    longDescription: "This durable industrial-grade water purifier is specifically engineered to meet the rigorous demands of factories and large-scale plants. Built with high-quality materials, it ensures long-lasting performance even in harsh working conditions. The system features advanced multi-stage filtration technology to effectively remove impurities, heavy metals, and contaminants, delivering clean and safe water for industrial processes. Its high flow rate and low maintenance design make it an ideal solution for continuous operation. Easy to install and operate, this purifier enhances operational efficiency while ensuring compliance with industry water quality standards.",
    features: ["100 L/hr", "Pre and post filters", "Rust-proof body", "SS frame"],
    capacity: "100 L/hr",
    powerUsage: "100W",
    dimensions: "75 x 50 x 80 cm",
    weight: "35 kg",
    material: "Stainless Steel",
    installationType: "Floor mounted",
    stock: 4,
    warranty: "2 Years",
    reviews: [
      { user: "Factory Manager", rating: 3, comment: "Durable build but filter replacement cost is high." },
      { user: "Shiv Kumar", rating: 4, comment: "Solid performance, suitable for large operations." }
    ]
  },
  {
    id: 6,
    image: WaterDispenser,
    name: "Industrial",
    category: "Industrial",
    brand: "Aqua Pro",
    price: 50,
    rating: 3,
    shortDescription: "Durable industrial-grade purifier for factories and plants...",
    longDescription: "This durable industrial-grade water purifier is specifically engineered to meet the rigorous demands of factories and large-scale plants. Built with high-quality materials, it ensures long-lasting performance even in harsh working conditions. The system features advanced multi-stage filtration technology to effectively remove impurities, heavy metals, and contaminants, delivering clean and safe water for industrial processes. Its high flow rate and low maintenance design make it an ideal solution for continuous operation. Easy to install and operate, this purifier enhances operational efficiency while ensuring compliance with industry water quality standards.",
    features: ["100 L/hr", "Pre and post filters", "Rust-proof body", "SS frame"],
    capacity: "100 L/hr",
    powerUsage: "100W",
    dimensions: "75 x 50 x 80 cm",
    weight: "35 kg",
    material: "Stainless Steel",
    installationType: "Floor mounted",
    stock: 4,
    warranty: "2 Years",
    reviews: [
      { user: "Factory Manager", rating: 3, comment: "Durable build but filter replacement cost is high." },
      { user: "Shiv Kumar", rating: 4, comment: "Solid performance, suitable for large operations." }
    ]
  },
  {
    id: 7,
    image: Industrial,
    name: "Industrial",
    category: "Industrial",
    brand: "Aqua Pro",
    price: 50,
    rating: 3,
    shortDescription: "Durable industrial-grade purifier for factories and plants...",
    longDescription: "This durable industrial-grade water purifier is specifically engineered to meet the rigorous demands of factories and large-scale plants. Built with high-quality materials, it ensures long-lasting performance even in harsh working conditions. The system features advanced multi-stage filtration technology to effectively remove impurities, heavy metals, and contaminants, delivering clean and safe water for industrial processes. Its high flow rate and low maintenance design make it an ideal solution for continuous operation. Easy to install and operate, this purifier enhances operational efficiency while ensuring compliance with industry water quality standards.",
    features: ["100 L/hr", "Pre and post filters", "Rust-proof body", "SS frame"],
    capacity: "100 L/hr",
    powerUsage: "100W",
    dimensions: "75 x 50 x 80 cm",
    weight: "35 kg",
    material: "Stainless Steel",
    installationType: "Floor mounted",
    stock: 4,
    warranty: "2 Years",
    reviews: [
      { user: "Factory Manager", rating: 3, comment: "Durable build but filter replacement cost is high." },
      { user: "Shiv Kumar", rating: 4, comment: "Solid performance, suitable for large operations." }
    ]
  }
];

const Rent = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");
const {fetchProducts,products} = useProductStore()
  useEffect(() => {
    fetchProducts()
  
  }, [])


  // const filteredProducts = products.filter((product) => {
  //   return (
  //     (selectedBrand === "" || product.brand === selectedBrand) &&
  //     (selectedCategory === "" || product.category === selectedCategory)
  //   );
  // });

  // Sort products based on selected option
  // const sortedProducts = [...filteredProducts].sort((a, b) => {
  //   switch (sortBy) {
  //     case "popularity":
  //       return b.rating - a.rating;
  //     case "rating":
  //       return b.rating - a.rating;
  //     case "low-to-high":
  //       return a.price - b.price;
  //     case "high-to-low":
  //       return b.price - a.price;
  //     default:
  //       return 0; // Default order (latest)
  //   }
  // });

  return (
    <>
      <OceanScene />

      <div className="font-sans bg-gray-50 min-h-screen p-6">
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

        <ProductList products={products} />
      </div>

      {/* <BottomNav /> */}
      {/* <ScrollToTopButton /> */}
    </>
  );
};

export default Rent;
