import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm = ({
  email,
  phone,
  otp,
  rememberMe,
  isPhone,
  otpSent,
  emailOtpSent,
  error,
  handleEmailChange,
  handlePhoneChange,
  handleOtpChange,
  handleRememberMeChange,
  sendEmailOtpHandler,
  sendPhoneOtpHandler,
  handleSubmit,
}) => {
  return (
    <motion.div
      className="max-w-md w-full mx-auto bg-black bg-opacity-50 rounded-lg p-6 border border-white shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <form className="overflow-hidden" onSubmit={handleSubmit}>
        <div className="mb-12">
          <motion.h3
            className="text-white text-3xl font-bold text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Log In
          </motion.h3>
        </div>

        {/* Buttons to toggle Email/Phone login */}
        <motion.div
          className="mb-6 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            type="button"
            className={`text-sm px-4 py-2 mr-4 rounded transition-all duration-300 ease-in-out ${
              !isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => handleRememberMeChange(false)}
          >
            Log In with Email
          </motion.button>
          <motion.button
            type="button"
            className={`text-sm px-4 py-2 rounded transition-all duration-300 ease-in-out ${
              isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => handleRememberMeChange(true)}
          >
            Log In with Phone
          </motion.button>
        </motion.div>

        {/* Email Input */}
        {!isPhone && (
          <motion.div className="mt-6">
            <input
              name="email"
              type="email"
              required
              className="bg-transparent w-full mb-4 text-sm text-white border-b border-white focus:white pl-2 pr-8 py-3 outline-none placeholder:text-white transition-all duration-300"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </motion.div>
        )}

        {/* Phone Input */}
        {isPhone && (
          <motion.div className="mt-6">
            <input
              name="phone"
              type="tel"
              required
              className="bg-transparent w-full mb-4 text-sm text-white border-b border-white focus:white pl-2 pr-8 py-3 outline-none placeholder:text-white transition-all duration-300"
              placeholder="Enter phone number"
              value={phone}
              onChange={handlePhoneChange}
            />
          </motion.div>
        )}

        {/* OTP Input */}
        {(otpSent || emailOtpSent) && (
          <motion.div className="mt-6">
            <input
              name="otp"
              type="text"
              required
              className="bg-transparent w-full text-sm text-white border-b border-white focus:white pl-2 pr-8 py-3 outline-none placeholder:text-white transition-all duration-300"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
            />
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="text-red-500 text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {/* Send OTP Buttons */}
        {isPhone && !otpSent && (
          <motion.div className="mb-6 flex justify-center">
            <motion.button
              type="button"
              className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg py-2 px-6 shadow-lg"
              onClick={sendPhoneOtpHandler}
               initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Send Mobile OTP
            </motion.button>
          </motion.div>
        )}

        {!isPhone && !otpSent && (
          <motion.div className="mb-6 flex justify-center">
            <motion.button
              type="button"
              className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg py-2 px-6 shadow-lg"
              onClick={sendEmailOtpHandler}
               initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Send Email OTP
            </motion.button>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div className="md:col-span-2 col-span-1 h-full w-full flex justify-center items-center">
          <motion.button
            className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg mt-4 py-2 px-6 shadow-lg w-full"
            type="submit"
          >
            LogIn
          </motion.button>
        </motion.div>

        {/* Signup Link */}
        <motion.div className="text-center mt-4">
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
