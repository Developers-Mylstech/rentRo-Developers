
import React, { use, useEffect, useRef, useState } from "react";
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
import { FaBox } from "react-icons/fa";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import orderConfirmedAnimation from '../../assets/orderConfirm.json'
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements, CardCvcElement, CardNumberElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../utils/axiosInstance";
import orderFailedAnimation from '../../assets/orderFailed.json'
export default function CheckoutForm({
  loading,
  onCreatePaymentIntent,
  paymentIntentLoading,
  paymentIntentError,

}) {
  const stepperRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [paymentOption, setPaymentOption] = useState("CREDIT_CARD");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentFail, setPaymentFail] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const cardNumber = elements?.getElement(CardNumberElement);
  const cardExpiry = elements?.getElement(CardExpiryElement);
  const cardCvc = elements?.getElement(CardCvcElement);

  const [orderId, setOrderId] = useState(null)
  const { item } = location.state || {};

  const stripePromise = loadStripe('pk_test_51RLOsxP9oSOUDJBLqZRCqPycQ0pD06U65h5e6oDLNOdao4GGbWAsd2s8A0Mfb4Hs5Ty1lENR0VgaF0UrsJPTjizn00WMqTFFDP');
  const { cartItems } = useCartStore()


  const { register, handleSubmit, formState: { errors }, control, setValue, watch, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: ""
    }
  });
  const { createOrder, BuyNowOrder } = useCheckoutStore()

  const paymentOptions = [
    { name: 'Credit Card', code: 'CREDIT_CARD' },
    { name: 'Debit Card', code: 'DEBIT_CARD' },
    { name: 'Net Banking', code: 'NET_BANKING' },

  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const isCartEmpty = !item && (!cartItems?.items || cartItems.items.length === 0);

    if (isCartEmpty) {
      alert('No items available for checkout.');
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [cartItems, item ,isMobile]);


  const handleContinueToPayment = async () => {
    if (!selectedAddress) {
      setApiError('Please select a shipping address');
      return;
    }

    const orderPayload = {
      ...(item ? {
        productType: item?.productType,
        quantity: item?.quantity
      } : {
        cartId: cartItems?.cartId
      }),
      mobile: watch("mobile"),
      email: watch("email"),
      addressId: selectedAddress,
      firstName: watch("firstName"),
      lastName: watch("lastName"),
    };



    let response;
    let checkoutId;

    if (item?.productId && item?.quantity) {

      response = await BuyNowOrder(orderPayload, item.productId);

    } else {
      response = await createOrder(orderPayload);
    }

    if (!response) {
      alert('Failed to create order');
      return;
    }

    checkoutId = response.checkoutId;
    setOrderId(response.orderId);

    if (!clientSecret && checkoutId) {
      const success = await onCreatePaymentIntent(checkoutId);
      console.log(success, 'payment intent success');

      if (success) {
        setClientSecret(success);
        stepperRef.current.nextCallback();
      } else {
        alert('Failed to create payment intent');
      }
    } else {
      alert('Payment field or checkoutId missing');
    }
  };


  const onSubmitOrder = async () => {

    setIsSubmitting(true);
    setApiError(null);
    try {
      if (paymentOption === 'CREDIT_CARD' || paymentOption === 'DEBIT_CARD') {
        if (!stripe || !elements) {
          throw new Error('Payment system not ready');
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
          throw new Error("Card details are incomplete or not mounted.");
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${watch("firstName")} ${watch("lastName")}`,
              email: watch("email"),
              phone: watch("mobile"),
            }
          }
        });
        if (paymentIntent?.id && orderId) {
          const response = await axiosInstance.get(`/payments/confirm/${paymentIntent?.id}?orderId=${orderId}`);
          if (response?.data?.success) {
            reset();
            stepperRef.current.nextCallback();
            // setTimeout(() => navigate('/'), 15000);
          } else {
            stepperRef.current.nextCallback();
            // setTimeout(() => navigate('/'), 15000);
            alert('Payment failed', response?.data?.message);
          }

        }


        if (error) throw error;
        if (paymentIntent.status !== 'succeeded') {
          throw new Error('Payment failed');
        }
      }

    } catch (error) {
      console.error('Order submission error:', error);
      setApiError(error.message || 'Failed to complete order');
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
                    type="button"
                    label={
                      loading ? 'Initializing Payment...' : 'Continue to Payment'
                    }
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    onClick={handleContinueToPayment}
                    disabled={isSubmitting || paymentIntentLoading}
                    className={classNames(
                      'text-blue-500 text-sm py-3 px-6 rounded-lg transition duration-200',
                      {
                        'bg-blue-100 border border-blue-500 hover:text-white hover:bg-blue-700':
                          !isSubmitting && !paymentIntentLoading,
                        'bg-blue-500 border border-blue-500 text-white cursor-not-allowed':
                          isSubmitting || paymentIntentLoading
                      }
                    )}
                  />

                </div>
              </form>
              {paymentIntentError && (
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  {paymentIntentError}
                </div>
              )}
            </StepperPanel>

            <StepperPanel header="Payment Method">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">Select Payment Method</h3>

                  <div className="grid gap-4">
                    {paymentOptions?.map((option) => (
                      <div
                        key={option.code}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentOption === option.code
                          ? 'border-blue-500 bg-blue-50/30 shadow-blue-100 shadow-sm'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                          }`}
                        onClick={() => setPaymentOption(option.code)}
                      >
                        <div className="flex items-center">
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${paymentOption === option.code
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-400'
                            }`}>
                            {paymentOption === option.code && (
                              <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 8 8" fill="none">
                                <circle cx="4" cy="4" r="3" fill="currentColor" />
                              </svg>
                            )}
                          </div>
                          <label className="block text-gray-800 font-medium cursor-pointer text-base">
                            {option.name}
                          </label>
                        </div>

                        {(option.code === 'CREDIT_CARD' || option.code === 'DEBIT_CARD') &&
                          paymentOption === option.code && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="mt-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                              <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                  <label className=" text-sm font-medium text-gray-700 flex items-center">
                                    Card Number
                                    <span className="ml-2 text-xs text-gray-400">1234 5678 9012 3456</span>
                                  </label>
                                  <div className="relative rounded-xl border border-gray-200 px-4 py-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                                    <CardNumberElement
                                      options={{
                                        style: {
                                          base: {
                                            fontSize: '15px',
                                            color: '#111827',
                                            fontFamily: 'Inter, sans-serif',
                                            '::placeholder': {
                                              color: '#9ca3af',
                                            },
                                          },
                                          invalid: {
                                            color: '#ef4444',
                                          },
                                        },
                                      }}
                                    />
                                    <div className="absolute right-3 top-3 flex space-x-2">
                                      <div className="w-6 h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm shadow-inner"></div>
                                      <div className="w-6 h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-sm shadow-inner"></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                  <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Expiration
                                    </label>
                                    <div className="rounded-xl border border-gray-200 px-4 py-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                                      <CardExpiryElement
                                        options={{
                                          style: {
                                            base: {
                                              fontSize: '15px',
                                              color: '#111827',
                                              fontFamily: 'Inter, sans-serif',
                                              '::placeholder': {
                                                color: '#9ca3af',
                                              },
                                            },
                                            invalid: {
                                              color: '#ef4444',
                                            },
                                          },
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <label className=" text-sm font-medium text-gray-700 flex items-center">
                                      CVC
                                      <span className="ml-2 text-xs text-gray-400">3 digits</span>
                                    </label>
                                    <div className="rounded-xl border border-gray-200 px-4 py-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                                      <CardCvcElement
                                        options={{
                                          style: {
                                            base: {
                                              fontSize: '15px',
                                              color: '#111827',
                                              fontFamily: 'Inter, sans-serif',
                                              '::placeholder': {
                                                color: '#9ca3af',
                                              },
                                            },
                                            invalid: {
                                              color: '#ef4444',
                                            },
                                          },
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-6">
                  <Button
                    label="Back to Shipping"
                    icon="pi pi-arrow-left"
                    iconPos="left"
                    onClick={() => stepperRef.current.prevCallback()}
                    className="text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all hover:shadow-sm"
                    outlined
                  />
                  <Button
                    label={isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : 'Pay Securely'}
                    icon="pi pi-lock"
                    iconPos="right"
                    onClick={onSubmitOrder}
                    disabled={isSubmitting}
                    className={classNames(
                      'font-medium py-3 px-8 rounded-xl transition-all hover:shadow-md', {
                      'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600': !isSubmitting,
                      'bg-gray-200 text-gray-500 cursor-not-allowed': isSubmitting
                    })}
                  />
                </div>
              </div>
            </StepperPanel>



            <StepperPanel header="Order Confirmation"   >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" space-y-6 text-center"
              >

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`${paymentFail ? '"bg-red-50 text-red-700 rounded-lg pb-5 flex  flex-col justify-center items-center"' : '"bg-green-50 text-green-700 rounded-lg pb-5 flex  flex-col justify-center items-center"'}`}
                >

                  <div className="w-40 h-40 mx-auto">
                    <Lottie
                      animationData={paymentFail ? orderFailedAnimation : orderConfirmedAnimation}
                      loop={true}
                      autoplay={true}
                    />
                  </div>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="md:text-2xl text-base font-semibold mb-2"
                  >
                    {paymentFail ? 'Order Failed' : 'Order Successful'}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-700 text-sm w-11/12"
                  >
                    {paymentFail ? 'Your order has failed. Please try again.' : 'Your order has been successfully placed.'}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-700 mt-4 font-medium"
                  >
                    {paymentFail ? '' : ` Order ID: #${orderId}`}
                  </motion.p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col justify-center items-center"
                >
                  {paymentFail ? 'Back to Home' : <button onClick={() => navigate('/profile')}
                    className="flex w-full gap-4 items-center justify-center text-blue-500 font-medium py-3 px-6 rounded-lg  transition duration-200">
                    <FaBox /> Track Order
                  </button>}

                  <p className="text-gray-500 text-xs w-11/12">After 10 seconds you will be redirected to home page</p>
                </motion.div>
              </motion.div>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
      <style>{`
        .p-stepper {
          max-width: 100%;
        }
      `}</style>
    </div>
  );
}