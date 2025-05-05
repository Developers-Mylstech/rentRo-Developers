// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import useCartStore from "../../Context/CartContext";
// import useCheckoutStore from "../../Context/CheckoutContext";
// import { FaCheckCircle, FaShoppingBag, FaCalendarAlt, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

// const OrderSuccessDialog = ({ orderDetails, onClose }) => {
//   const navigate = useNavigate();

//   const handleDoneClick = () => {
//     onClose();
//     navigate("/profile"); 
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md animate-fade-in">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
//           <div className="flex justify-center mb-4">
//             <FaCheckCircle className="text-white text-5xl animate-bounce" />
//           </div>
//           <h2 className="text-2xl font-bold text-white">Order Confirmed!</h2>
//           <p className="text-blue-100 mt-2">Your subscription has been successfully created</p>
//         </div>

//         {/* Order Summary */}
//         <div className="p-6 space-y-4">
//           <div className="flex items-start">
//             <div className="bg-blue-100 p-3 rounded-full mr-4">
//               <FaShoppingBag className="text-blue-600 text-xl" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800">Subscription Type</h3>
//               <p className="text-gray-600">{orderDetails.type === "individual" ? "Individual Plan" : "Company Plan"}</p>
//             </div>
//           </div>

//           <div className="flex items-start">
//             <div className="bg-blue-100 p-3 rounded-full mr-4">
//               <FaCalendarAlt className="text-blue-600 text-xl" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800">Start Date</h3>
//               <p className="text-gray-600">
//                 {orderDetails.deliveryDate}
//               </p>
//             </div>
//           </div>

//           {orderDetails.deliveryDays && (
//             <div className="flex items-start">
//               <div className="bg-blue-100 p-3 rounded-full mr-4">
//                 <FaCalendarAlt className="text-blue-600 text-xl" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">Delivery Days</h3>
//                 <p className="text-gray-600">
//                   {orderDetails.deliveryDays.join(", ")}
//                 </p>
//               </div>
//             </div>
//           )}

//           <div className="flex items-start">
//             <div className="bg-blue-100 p-3 rounded-full mr-4">
//               <FaMapMarkerAlt className="text-blue-600 text-xl" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800">Delivery Address</h3>
//               <p className="text-gray-600">{orderDetails.address}</p>
//             </div>
//           </div>

//           {/* <div className="flex items-start">
//             <div className="bg-blue-100 p-3 rounded-full mr-4">
//               <FaCreditCard className="text-blue-600 text-xl" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800">Payment Method</h3>
//               <p className="text-gray-600">
//                 {orderDetails.paymentOption}
//               </p>
//             </div>
//           </div> */}
//         </div>

//         {/* Footer */}
//         <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
//           <p className="text-sm text-gray-500">
//             Order ID: <span className="font-mono">{orderDetails.orderId}</span>
//           </p>
//           <button
//             onClick={handleDoneClick}
//             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CheckoutForm = () => {
//   const { register, handleSubmit, reset } = useForm();
//   const [type, setType] = useState("individual");
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const { cartItems } = useCartStore();
//   const { createOrder } = useCheckoutStore();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     const payload = {
//       cartId: cartItems.cartId,
//       name: data.fullName || data.contactPerson,
//       mobile: data.phone,
//       email: data.email,
//       homeAddress: data.homeAddress || data.companyAddress,
//       deliveryDate: data.startDate ? new Date(data.startDate).toISOString() : new Date().toISOString(),
//       paymentOption:  "CREDIT_CARD",
//       type: type,
//       deliveryDays: data.deliveryDays || [],
//       address: data.homeAddress || data.companyAddress
//     };

//     try {
//       // Simulate API call
//       const response = await createOrder(payload);

//       setOrderDetails({
//         ...payload,
//         orderId: response.orderId || Math.floor(Math.random() * 1000000).toString(), // Fallback for demo
//       });

//       setShowSuccessDialog(true);
//       reset();
//     } catch (error) {
//       console.error("Order submission failed:", error);
//       alert("Failed to submit order. Please try again.");
//     }
//   };

//   const Input = ({ label, name, type = "text", required = false, ...rest }) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-500 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         {...register(name, { required })}
//         type={type}
//         className="w-full px-2 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
//         {...rest}
//       />
//     </div>
//   );

//   const Select = ({ label, name, options, required = false }) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-500 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <select
//         {...register(name, { required })}
//         className="w-full px-2 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
//       >
//         <option value="">Select {label}</option>
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   );

//   const Section = ({ title, children }) => (
//     <div className="bg-gray-50 p-4 rounded-lg border">
//       <h3 className="text-lg font-semibold text-[#3a7bd5] mb-3">{title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
//     </div>
//   );

//   return (
//     <>
//       <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
//         <h1 className="md:text-3xl text-xl font-bold text-center text-[#3a7bd5] mt-14">
//            Filter Subscription 
//         </h1>

//         {/* Tabs */}
//         <div className="flex justify-center border-b border-gray-300 mt-6">
//           {["individual", "company"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setType(tab)}
//               className={`px-6 py-2 font-medium capitalize transition duration-200 ${
//                 type === tab
//                   ? "text-[#3a7bd5] border-b-2 border-[#3a7bd5]"
//                   : "text-gray-500 hover:text-[#3a7bd5]"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {type === "individual" ? (
//             <>
//               <Section title="Personal Information">
//                 <Input label="Full Name" name="fullName" required />
//                 <Input label="Phone Number" name="phone" required />
//                 <Input label="Email Address" name="email" type="email" required />
//                 <Input label="Home Address" name="homeAddress" required />
//               </Section>

//               <Section title="Subscription Details">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-1">
//                     Preferred Delivery Day <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex flex-wrap gap-4">
//                     {["Monday", "Wednesday", "Friday"].map((day) => (
//                       <label key={day} className="flex items-center space-x-2 text-gray-600">
//                         <input
//                           type="checkbox"
//                           value={day}
//                           {...register("deliveryDays", { required: true })}
//                         />
//                         <span>{day}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 <Input label="Start Date" name="startDate" type="date" required />
//               </Section>

//               <Section title="Payment Information">
//                 <Select
//                   label="Payment Method"
//                   name="paymentMethod"
//                   options={["Credit Card", "Debit Card", "Net Banking"]}
//                   required
//                 />
//                 <Input label="Billing Address (if different)" name="billingAddress" />
//               </Section>
//             </>
//           ) : (
//             <>
//               <Section title="Company Information">
//                 <Input label="Company Name" name="companyName" required />
//                 <Input label="Business Registration Number" name="registrationNumber" required />
//                 <Input label="Contact Person" name="contactPerson" required />
//                 <Input label="Position/Title" name="position" />
//                 <Input label="Phone Number" name="phone" required />
//                 <Input label="Email Address" name="email" type="email" required />
//                 <Input label="Company Address" name="companyAddress" required />
//               </Section>

//               <Section title="Subscription Details">
//                 <Select
//                   label="Delivery Schedule"
//                   name="deliverySchedule"
//                   options={["Weekly", "Bi-weekly", "Monthly"]}
//                   required
//                 />
//                 <Input
//                   label="Number of Filters Required per Month"
//                   name="filtersPerMonth"
//                   type="number"
//                   min="1"
//                   required
//                 />
//                 <Input label="Start Date" name="startDate" type="date" required />
//               </Section>

//               <Section title="Payment & Billing">
//                 <Input label="Billing Contact Name" name="billingContact" required />
//                 <Input label="Billing Email" name="billingEmail" type="email" required />
//                 <Select
//                   label="Payment Method"
//                   name="paymentMethod"
//                   options={["Credit Card", "Invoice", "Direct Debit"]}
//                   required
//                 />
//                 <Input label="Billing Address" name="billingAddress" required />
//               </Section>
//             </>
//           )}

//           <div className="text-center">
//             <button
//               type="submit"
//               className="mt-4 px-6 py-3 bg-[#3a7bd5] text-white font-semibold rounded-lg shadow-md hover:bg-[#2a6bc5] transition-colors"
//             >
//               Submit Subscription
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Success Dialog */}
//       {showSuccessDialog && (
//         <OrderSuccessDialog 
//           orderDetails={orderDetails}
//           onClose={() => {
//             setShowSuccessDialog(false);
//             navigate("/"); // Navigate to home
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default CheckoutForm;





import React, { useEffect, useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Controller, useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { useAddressStore } from "../../Context/AddressContext";
import useCartStore from "../../Context/CartContext";
import useCheckoutStore from "../../Context/CheckoutContext";
import AddAddress from "./AddAddress";

export default function CheckoutForm() {
  const stepperRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [paymentOption, setPaymentOption] = useState("CREDIT_CARD");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { register, handleSubmit, formState: { errors }, control, setValue, watch, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: ""
    }
  });
  const { cartItems } = useCartStore();
  const { createOrder } = useCheckoutStore()



  const paymentOptions = [
    { name: 'Credit Card', code: 'CREDIT_CARD' },
    { name: 'Debit Card', code: 'DEBIT_CARD' },
    { name: 'Net Banking', code: 'NET_BANKING' },

  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onSubmitOrder = async () => {
    setIsSubmitting(true);
    setApiError(null);


    try {
      const orderPayload = {
        cartId: cartItems?.cartId,
        name: watch("name"),
        mobile: watch("mobile"),
        email: watch("email"),
        addressId: selectedAddress,
        firstName: watch("firstName"),
        lastName: watch("lastName"),
        paymentOption: paymentOption,

      };

      console.log("Submitting order:", orderPayload);


      const response = await createOrder(orderPayload);
      console.log('Order created:', response.data);
      stepperRef.current.nextCallback();
    } catch (error) {
      console.error('Error creating order:', error);
      setApiError(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" mx-auto p-6  rounded-xl shadow-lg">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 my-28">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8  ">Checkout</h1>

        <div className="bg-white rounded-lg">
          <Stepper ref={stepperRef} linear className="stepper-wrapper" orientation={isMobile ? 'vertical' : 'horizontal'} >
            <StepperPanel header="Personal Details">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(() => {
                  stepperRef.current.nextCallback();
                })();
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <InputText
                      className={classNames('w-full p-3 border rounded-lg', {
                        'border-gray-300': !errors.firstName,
                        'border-red-500': errors.firstName
                      })}
                      {...register("firstName", { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <InputText
                      className={classNames('w-full p-3 border rounded-lg', {
                        'border-gray-300': !errors.lastName,
                        'border-red-500': errors.lastName
                      })}
                      {...register("lastName", { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                    <InputText
                      className={classNames('w-full p-3 border rounded-lg', {
                        'border-gray-300': !errors.mobile,
                        'border-red-500': errors.mobile
                      })}
                      {...register("mobile", {
                        required: 'Mobile number is required',
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message: 'Invalid mobile number'
                        }
                      })}
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <InputText
                      className={classNames('w-full p-3 border rounded-lg', {
                        'border-gray-300': !errors.email,
                        'border-red-500': errors.email
                      })}
                      {...register("email", {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex pt-4 justify-end">
                  <Button
                    label="Continue to Address"
                    icon="pi pi-arrow-right"
                    iconPos="right"
     
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200"
                  />
                </div>
              </form>
            </StepperPanel>

            <StepperPanel header="Shipping Address">
              <form>
                <AddAddress setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />

                {apiError && (
                  <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {apiError}
                  </div>
                )}

                <div className="flex pt-4 justify-end">
                  <Button
                          type="button"  // Add this to prevent form submission

                    label={isSubmitting ? 'Saving...' : 'Continue to Payment'}
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}
                    disabled={isSubmitting}
                    className={classNames(
                      'text-blue-500 text-sm py-3 px-6 rounded-lg transition duration-200',
                      {
                        'bg-blue-100 border border-blue-500 hover:text-white hover:bg-blue-700': !isSubmitting,
                        'bg-blue-500 border border-blue-500 text-white cursor-not-allowed': isSubmitting
                      }
                    )}
                  />
                </div>
              </form>
            </StepperPanel>

            <StepperPanel header="Payment Method">
              <div className="p-4 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Select Payment Method</h2>
                <div className="space-y-3">
                  {paymentOptions?.map((option) => (
                    <div
                      key={option.code}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentOptions === option.code
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                        }`}
                      onClick={() => setPaymentOption(option.code)}
                    >
                      <input
                        type="radio"
                        name="payment"
                        id={option.code}
                        checked={paymentOption === option.code}
                        onChange={() => { }}
                        className="h-5 w-5 text-blue-600"
                      />
                      <label htmlFor={option.code} className="ml-3 block text-gray-700">
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex pt-4 justify-between">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => stepperRef.current.prevCallback()}
                  className="text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
                />
                <Button
                  label="Place Order"
                  onClick={onSubmitOrder}
                  disabled={isSubmitting}
                  className={classNames(
                    'text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200', {
                    'bg-green-600 hover:bg-green-700': !isSubmitting,
                    'bg-green-400 cursor-not-allowed': isSubmitting
                  })}
                />
              </div>
            </StepperPanel>

            {/* Review Step */}
            {/* <StepperPanel header="Review Order">
              <div className="p-4 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Review Your Order</h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Personal Details</h3>
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {watch("name")}</p>
                  <p className="text-gray-700"><span className="font-medium">Mobile:</span> {watch("mobile")}</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {watch("email")}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Shipping Address</h3>
                  <p className="text-gray-700">{watch("streetAddress")}, {watch("buildingName")}</p>
                  <p className="text-gray-700">Flat/Villa No: {watch("flatNo")}</p>
                  <p className="text-gray-700">{watch("area")}, {watch("emirate")}</p>
                  <p className="text-gray-700">{watch("country")}</p>
                  {watch("landmark") && <p className="text-gray-700">Landmark: {watch("landmark")}</p>}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
                  <p className="text-gray-700">
                    {paymentOptions.find(o => o.code === paymentOption)?.name}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>$129.99</span>
                  </div>
                </div>
              </div>
              <div className="flex pt-4 justify-between">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => stepperRef.current.prevCallback()}
                  className="text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
                />
                <Button
                  label="Place Order"
                  onClick={onSubmitOrder}
                  disabled={isSubmitting}
                  className={classNames(
                    'text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200', {
                    'bg-green-600 hover:bg-green-700': !isSubmitting,
                    'bg-green-400 cursor-not-allowed': isSubmitting
                  })}
                />
              </div>
            </StepperPanel> */}
            <StepperPanel header="Order Confirmation">
              <div className="p-4 space-y-6 text-center">
                <div className="bg-green-50 text-green-700 p-6 rounded-lg">
                  <i className="pi pi-check-circle text-5xl mb-4"></i>
                  <h2 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h2>
                  <p className="text-gray-700">Thank you for your purchase. Your order has been received.</p>
                  <p className="text-gray-700 mt-4">Order ID: #123456</p>
                </div>
                <Button
                  label="Back to Home"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-200"
                />
              </div>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </div>
  );
}