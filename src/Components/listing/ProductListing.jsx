import React from "react";
import notFount from "../../assets/notFound.png";
import ProductDetail from "../../Components/SaleProductDetail";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products }) => {
console.log(products,'pppoo')
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product?.name}`, { state: { product } });
  };

  return (
    <div className="flex justify-center items-center mx-auto">
      <div className="flex justify-center items-center flex-wrap mx-auto gap-10 ">
        {products?.length > 0 ? (
          products?.map((product, index) => (
            <div
              key={index}
              onClick={() => handleProductClick(product)}
              className="bg-white mx-10 md:mx-0 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 relative"
            >
             <div className="flex justify-center items-center mt-4">
             <img
                src={product?.imageUrls[0]}
                alt={product?.name}
                className="w-full md:w-64 h-64"
              />
             </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {product?.name}
                </h3>
                
                </div>
                <p className="text-gray-700 w-64 text-sm">{product?.description}</p>
                <p className="text-gray-700 bg-green-100 my-2 p-2 rounded-lg text-center">View Product</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-[30vh] w-[95vw]">
            <img
              src={notFount}
              alt="Not Found"
              className="md:h-52 w-auto h-28"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
