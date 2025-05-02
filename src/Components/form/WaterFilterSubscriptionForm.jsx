import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../Context/CartContext";
import useCheckoutStore from "../../Context/CheckoutContext";
import { FaCheckCircle, FaShoppingBag, FaCalendarAlt, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

const OrderSuccessDialog = ({ orderDetails, onClose }) => {
  const navigate = useNavigate();

  const handleDoneClick = () => {
    onClose();
    navigate("/profile"); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-white text-5xl animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-white">Order Confirmed!</h2>
          <p className="text-blue-100 mt-2">Your subscription has been successfully created</p>
        </div>

        {/* Order Summary */}
        <div className="p-6 space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaShoppingBag className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Subscription Type</h3>
              <p className="text-gray-600">{orderDetails.type === "individual" ? "Individual Plan" : "Company Plan"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaCalendarAlt className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Start Date</h3>
              <p className="text-gray-600">
                {orderDetails.deliveryDate}
              </p>
            </div>
          </div>

          {orderDetails.deliveryDays && (
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Delivery Days</h3>
                <p className="text-gray-600">
                  {orderDetails.deliveryDays.join(", ")}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Delivery Address</h3>
              <p className="text-gray-600">{orderDetails.address}</p>
            </div>
          </div>

          {/* <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaCreditCard className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Payment Method</h3>
              <p className="text-gray-600">
                {orderDetails.paymentOption}
              </p>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Order ID: <span className="font-mono">{orderDetails.orderId}</span>
          </p>
          <button
            onClick={handleDoneClick}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const WaterFilterSubscriptionForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [type, setType] = useState("individual");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { cartItems } = useCartStore();
  const { createOrder } = useCheckoutStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      cartId: cartItems.cartId,
      name: data.fullName || data.contactPerson,
      mobile: data.phone,
      email: data.email,
      homeAddress: data.homeAddress || data.companyAddress,
      deliveryDate: data.startDate ? new Date(data.startDate).toISOString() : new Date().toISOString(),
      paymentOption:  "CREDIT_CARD",
      type: type,
      deliveryDays: data.deliveryDays || [],
      address: data.homeAddress || data.companyAddress
    };

    try {
      // Simulate API call
      const response = await createOrder(payload);
      
      setOrderDetails({
        ...payload,
        orderId: response.orderId || Math.floor(Math.random() * 1000000).toString(), // Fallback for demo
      });
      
      setShowSuccessDialog(true);
      reset();
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  const Input = ({ label, name, type = "text", required = false, ...rest }) => (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name, { required })}
        type={type}
        className="w-full px-2 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
        {...rest}
      />
    </div>
  );

  const Select = ({ label, name, options, required = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name, { required })}
        className="w-full px-2 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-semibold text-[#3a7bd5] mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <h1 className="md:text-3xl text-xl font-bold text-center text-[#3a7bd5] mt-14">
           Filter Subscription 
        </h1>

        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-300 mt-6">
          {["individual", "company"].map((tab) => (
            <button
              key={tab}
              onClick={() => setType(tab)}
              className={`px-6 py-2 font-medium capitalize transition duration-200 ${
                type === tab
                  ? "text-[#3a7bd5] border-b-2 border-[#3a7bd5]"
                  : "text-gray-500 hover:text-[#3a7bd5]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {type === "individual" ? (
            <>
              <Section title="Personal Information">
                <Input label="Full Name" name="fullName" required />
                <Input label="Phone Number" name="phone" required />
                <Input label="Email Address" name="email" type="email" required />
                <Input label="Home Address" name="homeAddress" required />
              </Section>

              <Section title="Subscription Details">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Preferred Delivery Day <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["Monday", "Wednesday", "Friday"].map((day) => (
                      <label key={day} className="flex items-center space-x-2 text-gray-600">
                        <input
                          type="checkbox"
                          value={day}
                          {...register("deliveryDays", { required: true })}
                        />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Input label="Start Date" name="startDate" type="date" required />
              </Section>

              <Section title="Payment Information">
                <Select
                  label="Payment Method"
                  name="paymentMethod"
                  options={["Credit Card", "Debit Card", "Net Banking"]}
                  required
                />
                <Input label="Billing Address (if different)" name="billingAddress" />
              </Section>
            </>
          ) : (
            <>
              <Section title="Company Information">
                <Input label="Company Name" name="companyName" required />
                <Input label="Business Registration Number" name="registrationNumber" required />
                <Input label="Contact Person" name="contactPerson" required />
                <Input label="Position/Title" name="position" />
                <Input label="Phone Number" name="phone" required />
                <Input label="Email Address" name="email" type="email" required />
                <Input label="Company Address" name="companyAddress" required />
              </Section>

              <Section title="Subscription Details">
                <Select
                  label="Delivery Schedule"
                  name="deliverySchedule"
                  options={["Weekly", "Bi-weekly", "Monthly"]}
                  required
                />
                <Input
                  label="Number of Filters Required per Month"
                  name="filtersPerMonth"
                  type="number"
                  min="1"
                  required
                />
                <Input label="Start Date" name="startDate" type="date" required />
              </Section>

              <Section title="Payment & Billing">
                <Input label="Billing Contact Name" name="billingContact" required />
                <Input label="Billing Email" name="billingEmail" type="email" required />
                <Select
                  label="Payment Method"
                  name="paymentMethod"
                  options={["Credit Card", "Invoice", "Direct Debit"]}
                  required
                />
                <Input label="Billing Address" name="billingAddress" required />
              </Section>
            </>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-[#3a7bd5] text-white font-semibold rounded-lg shadow-md hover:bg-[#2a6bc5] transition-colors"
            >
              Submit Subscription
            </button>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <OrderSuccessDialog 
          orderDetails={orderDetails}
          onClose={() => {
            setShowSuccessDialog(false);
            navigate("/"); // Navigate to home
          }}
        />
      )}
    </>
  );
};

export default WaterFilterSubscriptionForm;