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
import Skeleton from "react-loading-skeleton";



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
  const { fetchRentProducts, rentProducts, loading } = useProductStore()
  useEffect(() => {
    fetchRentProducts()

  }, [])

  return (
    <>
      <OceanScene />

      <div className="font-sans bg-gray-50 min-h-screen p-6">

        {!loading ? (
          <ProductList products={rentProducts} />
        ) : (
          <ProductSkeleton count={6} />
        )}


      </div>
    </>
  );
};

export default Rent;

const ProductSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-4">
          <Skeleton height={180} className="rounded" />
          <Skeleton height={20} width={`80%`} className="mt-4" />
          <Skeleton height={20} width={`60%`} />
          <Skeleton height={30} width={`50%`} className="mt-2" />
        </div>
      ))}
    </div>
  );
};