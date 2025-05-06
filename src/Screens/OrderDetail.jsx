import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaMoneyBillWave,
  FaCreditCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaStore,
  FaUserCheck,
  FaShippingFast,
} from "react-icons/fa";
import { motion } from "framer-motion";

const OrderDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  // Timeline data
  const timelineSteps = [
    {
      id: "ORDER_PLACED",
      title: "Order Placed",
      icon: <FaStore className="text-sm" />,
      description: "Your order has been received",
      active: true,
      completed: true,
      date: order?.createdAt,
    },
    {
      id: "ORDER_CONFIRMED",
      title: "Order Confirmed",
      icon: <FaUserCheck className="text-sm" />,
      description: "Seller has processed your order",
      active: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].includes(
        order?.status
      ),
      completed: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].includes(
        order?.status
      ),
      date: order?.createdAt, // Typically same as order placed for e-commerce
    },
    {
      id: "PROCESSING",
      title: "Processing",
      icon: <FaBox className="text-sm" />,
      description: "Seller is preparing your order",
      active: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].includes(
        order?.status
      ),
      completed: ["SHIPPED", "DELIVERED", "CANCELLED"].includes(order?.status),
      date: order?.updatedAt,
    },
    {
      id: "SHIPPED",
      title: "Shipped",
      icon: <FaShippingFast className="text-sm" />,
      description: "Seller has shipped your order",
      active: ["SHIPPED", "DELIVERED"].includes(order?.status),
      completed: order?.status === "DELIVERED",
      date:
        order?.status === "SHIPPED" || order?.status === "DELIVERED"
          ? order?.updatedAt
          : null,
    },
    {
      id: "DELIVERED",
      title: "Delivered",
      icon: <FaCheckCircle className="text-sm" />,
      description: "Your order has been delivered",
      active: order?.status === "DELIVERED",
      completed: order?.status === "DELIVERED",
      date: order?.status === "DELIVERED" ? order?.updatedAt : null,
    },
  ];

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Order not found
          </h3>
          <p className="text-gray-500 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8 ">
      {/* <button
        onClick={() => navigate("/orders")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors mt-14"
      >
        <FaChevronLeft className="mr-1" /> Back to Orders
      </button> */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        {/* Order Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h1 className="md:text-2xl text-xl font-bold text-gray-800 mb-1">
                Order #{order.orderNumber}
              </h1>
              <p className="text-gray-500">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                    {/* Enhanced Order Timeline */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Tracking
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200">
              {/* Progress indicator */}
              <motion.div
                className="absolute top-0 left-0 w-0.5 bg-blue-600"
                initial={{ height: 0 }}
                animate={{
                  height: `${
                    (timelineSteps.filter((step) => step.completed).length /
                      timelineSteps.length) *
                    100
                  }%`,
                }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Timeline steps */}
            <div className="space-y-8">
              {timelineSteps.map((step, index) => (
                <div key={step.id} className="relative pl-10">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full ${
                      step.completed
                        ? "bg-blue-600 text-white shadow-lg"
                        : step.active
                        ? "bg-blue-100 text-blue-600 border-2 border-blue-500"
                        : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Timeline content */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3
                      className={`text-base font-medium ${
                        step.completed ? "text-gray-800" : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {step.description}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-400">
                        {new Date(step.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div>
        {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
          <div className="p-6 border-b border-gray-100 bg-blue-50">
            <div className="flex items-start">
              <FaCalendarAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-base font-medium text-gray-800">Estimated Delivery</h3>
                <p className="text-gray-600">
                  {new Date(order.deliveryDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
                {order.status === "SHIPPED" && (
                  <p className="text-sm text-blue-600 mt-1">
                    Your order is on its way!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-start">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 rounded-md object-cover border border-gray-200"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-medium text-gray-800">{item.productName}</h3>
                  <p className="text-sm text-gray-500">
                    {item.productType === "RENT" ? `Rent for ${item.rentPeriod} months` : "Purchase"}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-base font-medium text-gray-800">
                      AED {item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">AED {order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">Free</span>
            </div>
            <div className="flex justify-between font-medium text-lg mt-2 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span className="text-gray-800">AED {order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        </div>
        </div>

        {/* Delivery Information */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Delivery Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-gray-500 mt-1 mr-3" />
              <div>
                <h3 className="text-base font-medium text-gray-800">
                  Delivery Address
                </h3>
                <p className="text-gray-600">
                  {order.deliveryAddress.buildingName &&
                    `${order.deliveryAddress.buildingName}, `}
                  {order.deliveryAddress.flatNo &&
                    `Flat ${order.deliveryAddress.flatNo}, `}
                  {order.deliveryAddress.streetAddress &&
                    `${order.deliveryAddress.streetAddress}, `}
                  {order.deliveryAddress.area &&
                    `${order.deliveryAddress.area}, `}
                  {order.deliveryAddress.emirate &&
                    `${order.deliveryAddress.emirate}, `}
                  {order.deliveryAddress.country}
                </p>
                {order.deliveryAddress.landmark && (
                  <p className="text-sm text-gray-500 mt-1">
                    Landmark: {order.deliveryAddress.landmark}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Payment Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="text-gray-800 flex items-center">
                {order.paymentMethod === "CARD" ? (
                  <FaCreditCard className="mr-2" />
                ) : (
                  <FaMoneyBillWave className="mr-2" />
                )}
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status</span>
              <span
                className={`font-medium ${
                  order.isPaid ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {order.isPaid ? (
                  <span className="flex items-center">
                    <FaCheckCircle className="mr-1" /> Paid
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FaMoneyBillWave className="mr-1" /> Pending
                  </span>
                )}
              </span>
            </div>
            {order.isPaid && (
              <div className="flex justify-between">
                <span className="text-gray-600">Paid On</span>
                <span className="text-gray-800">
                  {new Date(order.paidAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
