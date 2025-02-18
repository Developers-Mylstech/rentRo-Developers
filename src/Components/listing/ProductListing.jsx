import React from "react";
import notFount from "../../assets/notFound.png";

const ProductList = ({ products }) => {
  return (
    <div className="flex justify-center items-center mx-auto">
      <div className="flex justify-center items-center flex-wrap mx-auto gap-10 ">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="bg-white mx-10 md:mx-0 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full md:w-64 object-cover"
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
