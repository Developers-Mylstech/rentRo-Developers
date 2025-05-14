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
  FaMoneyCheckAlt,
  FaTruckLoading,
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
      id: "PAYMENT_CONFIRMED",
      title: "Payment Confirmed",
      icon: <FaMoneyCheckAlt className="text-sm" />,
      description: "Payment has been successfully received",
      active: order?.isPaid || ["PAYMENT_CONFIRMED", "PROCESSING", "READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"].includes(order?.status),
      completed: order?.isPaid || ["PROCESSING", "READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"].includes(order?.status),
      date: order?.paymentConfirmedAt || order?.paidAt || order?.updatedAt,
    },
    {
      id: "PROCESSING",
      title: "Processing",
      icon: <FaUserCheck className="text-sm" />,
      description: "Seller is preparing your order",
      active: ["PROCESSING", "READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED","PAYMENT_CONFIRMED"].includes(order?.status),
      completed: ["READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"].includes(order?.status),
      date: order?.processingAt || order?.updatedAt,
    },
    {
      id: "READY_FOR_DELIVERY",
      title: "Ready for Delivery",
      icon: <FaTruckLoading className="text-sm" />,
      description: "Your order is ready to be dispatched",
      active: ["READY_FOR_DELIVERY", "OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED","PROCESSING"].includes(order?.status),
      completed: ["OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED","PROCESSING","READY_FOR_DELIVERY"].includes(order?.status),
      date: order?.readyAt || order?.updatedAt,
    },
    {
      id: "OUT_FOR_DELIVERY",
      title: "Out for Delivery",
      icon: <FaShippingFast className="text-sm" />,
      description: "Your order is on the way",
      active: ["OUT_FOR_DELIVERY", "DELIVERED", "COMPLETED"].includes(order?.status),
      completed: ["DELIVERED", "COMPLETED","OUT_FOR_DELIVERY"].includes(order?.status),
      date: order?.outForDeliveryAt || order?.updatedAt,
    },
    {
      id: "DELIVERED",
      title: "Delivered",
      icon: <FaCheckCircle className="text-sm" />,
      description: "Your order has been delivered",
      active: ["DELIVERED", "COMPLETED"].includes(order?.status),
      completed: ["DELIVERED", "COMPLETED"].includes(order?.status),
      date: order?.deliveredAt || order?.updatedAt,
    },
    {
      id: "COMPLETED",
      title: "Completed",
      icon: <FaCheckCircle className="text-sm" />,
      description: "Your order is completed",
      active: order?.status === "COMPLETED",
      completed: order?.status === "COMPLETED",
      date: order?.completedAt || order?.updatedAt,
    },
    {
      id: "CANCELLED",
      title: "Cancelled",
      icon: <FaTimesCircle className="text-sm text-red-500" />,
      description: "This order has been cancelled",
      active: ["CANCELLED", "PAYMENT_FAILED"].includes(order?.status),
      completed: ["CANCELLED", "PAYMENT_FAILED"].includes(order?.status),
      date: order?.cancelledAt || order?.updatedAt,
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

  function getStatusColor(status) {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 border-amber-200 text-amber-800";
      case "PAYMENT_CONFIRMED":
        return "bg-teal-100 border-teal-200 text-teal-800";
      case "PROCESSING":
        return "bg-blue-100 border-blue-200 text-blue-800";
      case "READY_FOR_DELIVERY":
        return "bg-indigo-100 border-indigo-200 text-indigo-800";
      case "OUT_FOR_DELIVERY":
        return "bg-purple-100 border-purple-200 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 border-green-200 text-green-800";
      case "CANCELLED":
        return "bg-red-100 border-red-200 text-red-800";
      case "PAYMENT_FAILED":
        return "bg-red-100 border-red-200 text-red-800";
      case "COMPLETED":
        return "bg-emerald-100 border-emerald-200 text-emerald-800";
      default:
        return "";
    }
  }

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
                Order #{order?.orderNumber}
              </h1>
              <p className="text-gray-500">
                Placed on{" "}
                {new Date(order?.createdAt).toLocaleDateString("en-US", {
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
                {getStatusIcon(order?.status)}
                {order?.status.charAt(0) + order?.status.slice(1).toLowerCase()}
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
              <div className="absolute left-4 top-0 h-[95%] w-0.5 bg-gray-200">
                {/* Progress indicator */}
                <motion.div
                  className="absolute top-0 left-0 w-0.5 bg-blue-600"
                  initial={{ height: 0 }}
                  animate={{
                    height: `${
                      (timelineSteps.filter((step) => step.completed).length /
                        timelineSteps?.length) *
                      116
                    }%`,
                  }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <div className="space-y-8">
  
                {(order?.status === "CANCELLED" ||
                order?.status === "PAYMENT_FAILED"
                  ? timelineSteps.filter((step) => step.id === "CANCELLED")
                  : timelineSteps.filter((step) => step.id !== "CANCELLED")
                ).map((step, index) => (
                  <div key={step.id} className="relative pl-10">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full ${
                        step?.completed
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
          <div className="bg-white  rounded-lg shadow-sm overflow-hidden">
            {/* Estimated Delivery */}
            {order.status !== "DELIVERED" || order.status !== "CANCELLED" || order.status !== "COMPLETED" && (
              <div className=" bg-yellow-50 p-6 border-b border-yellow-200">
                <div className="flex items-start space-x-4">
                  <FaCalendarAlt className="text-yellow-600 text-xl mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900">
                      Arriving by
                    </h3>
                    <p className="text-base text-yellow-800 font-medium">
                      {new Date(order.deliveryDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    {order.status === "SHIPPED" && (
                      <p className="text-sm text-yellow-700 mt-1">
                        Your package is on the way! Track it in your orders.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className=" py-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Items in your Order
              </h2>
              <div className="space-y-5">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <img
                      src={item?.productImage}
                      alt={item?.productName}
                      className="w-20 h-20 rounded-md object-cover border border-gray-300 shadow-sm"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-base font-medium text-gray-900">
                        {item?.productName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item?.productType === "RENT"
                          ? `Rented for ${item?.rentPeriod} months`
                          : "Purchased"}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">
                          Qty: {item?.quantity}
                        </span>
                        <span className="text-base font-semibold text-gray-800">
                          AED {item?.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    AED {order?.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t pt-3 mt-3 border-gray-200">
                  <span>Total</span>
                  <span className="text-gray-900">
                    AED {order?.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="py-6 border-b border-gray-100">
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
                      {order?.deliveryAddress?.buildingName &&
                        `${order?.deliveryAddress?.buildingName}, `}
                      {order?.deliveryAddress?.flatNo &&
                        `Flat ${order?.deliveryAddress?.flatNo}, `}
                      {order?.deliveryAddress?.streetAddress &&
                        `${order?.deliveryAddress?.streetAddress}, `}
                      {order?.deliveryAddress?.area &&
                        `${order?.deliveryAddress?.area}, `}
                      {order?.deliveryAddress?.emirate &&
                        `${order?.deliveryAddress?.emirate}, `}
                      {order?.deliveryAddress?.country}
                    </p>
                    {order?.deliveryAddress?.landmark && (
                      <p className="text-sm text-gray-500 mt-1">
                        Landmark: {order?.deliveryAddress?.landmark}
                      </p>
                    )}
                  </div>
                </div>
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
                {order?.paymentMethod}
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
                  {new Date(order?.paidAt).toLocaleDateString("en-US", {
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
