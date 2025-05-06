import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaCheckCircle, FaTruck, FaTimesCircle, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

const OrderList = ({ orders }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ALL");

  const handleOrderClick = (order) => {
    navigate(`/order/${order.orderId}`, { state: { order } });
  };

  const filteredOrders = orders.filter(order => {
    if (activeFilter === "ALL") return true;
    return order.status === activeFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <FaBox className="mr-1" />;
      case "PROCESSING":
        return <FaBox className="mr-1" />;
      case "SHIPPED":
        return <FaTruck className="mr-1" />;
      case "DELIVERED":
        return <FaCheckCircle className="mr-1" />;
      case "CANCELLED":
        return <FaTimesCircle className="mr-1" />;
      default:
        return <FaBox className="mr-1" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
      
      {/* Filter Tabs */}
      <div className="flex  gap-2 mb-6 border-b border-gray-200 pb-4 overflow-y-auto">
        {["ALL", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter.charAt(0) + filter.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filteredOrders?.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders?.map((order) => (
            <motion.div
              key={order.orderId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleOrderClick(order)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
            >
              <div className="p-2 md:p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="md:text-lg text-base font-semibold text-gray-800">
                      Order #{order?.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order?.status)}
                    {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex -space-x-2">
                    {order?.items?.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item?.productImage}
                        alt={item?.productName}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    {order?.items?.length > 3 && (
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                        +{order?.items?.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {order?.items?.length} {order?.items?.length === 1 ? "item" : "items"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order?.items[0]?.productName}
                      {order?.items?.length > 1 && ` + ${order?.items?.length - 1} more`}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Total amount</p>
                    <p className="text-lg font-bold text-gray-800">
                      AED {order?.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    {order?.isPaid ? (
                      <span className="flex items-center text-green-600">
                        <FaCheckCircle className="mr-1" /> Paid
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-600">
                        <FaMoneyBillWave className="mr-1" /> Pending
                      </span>
                    )}
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      {order.paymentMethod === "CARD" ? (
                        <FaCreditCard className="mr-1" />
                      ) : (
                        <FaMoneyBillWave className="mr-1" />
                      )}
                      {order?.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="mx-auto max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBox className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-6">
              {activeFilter === "ALL"
                ? "You haven't placed any orders yet."
                : `You don't have any ${activeFilter.toLowerCase()} orders.`}
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;