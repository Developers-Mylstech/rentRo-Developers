import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import OceanScene from "../Components/widget/OceanScene";
import ProductList from "../Components/listing/ProductListing";
import useProductStore from "../Context/ProductContext";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        await fetchProducts();
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    loadProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <OceanScene />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <section className="bg-blue-50 rounded-lg shadow-md p-6 md:p-8 lg:p-10">
          {products && products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No products available at the moment.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Shop;