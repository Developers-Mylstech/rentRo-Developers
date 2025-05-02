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
import Skeleton from "react-loading-skeleton";



const Sale = () => {
  const { fetchSellProducts, saleProducts,loading } = useProductStore()
  useEffect(() => {
    fetchSellProducts()

  }, [])
  // const [selectedBrand, setSelectedBrand] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [sortBy, setSortBy] = useState("latest");

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };



  return (
    <>
      <OceanScene />
      <div className="font-sans bg-gray-50 min-h-screen py-10">
       
        {!loading ? (
          <ProductList products={saleProducts} />
        ) : (
          <ProductSkeleton count={6} />
        )}
      </div>

      <WaterFilterSubscriptionForm />

    </>
  );
};

export default Sale;

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