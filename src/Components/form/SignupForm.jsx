import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoLogoApple } from "react-icons/io";
import { motion } from "framer-motion";

// Mock functions for sending OTP
const sendEmailOtp = (email) => {
  console.log(`Sending OTP to email: ${email}`);
  return "1234";
};

const sendPhoneOtp = (phone) => {
  console.log(`Sending OTP to phone: ${phone}`);
  return "1234";
};

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sentOtp, setSentOtp] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle submit logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (otpSent) {
      if (otp !== sentOtp) {
        setError("Invalid OTP. Please try again.");
        setIsLoading(false);
        return;
      }
      console.log("OTP Verified successfully");
      setIsLoading(false);
    } else {
      if (isPhone && !phone) {
        setError("Please enter a valid phone number.");
        setIsLoading(false);
        return;
      }
      if (!isPhone && !email) {
        setError("Please enter a valid email address.");
        setIsLoading(false);
        return;
      }
      setError("");
      if (isPhone) {
        const otpGenerated = sendPhoneOtp(phone);
        setSentOtp(otpGenerated);
      } else {
        const otpGenerated = sendEmailOtp(email);
        setSentOtp(otpGenerated);
      }
      setOtpSent(true);
      setIsLoading(false);
    }
  };

  // Send OTP for phone number
  const sendPhoneOtpHandler = () => {
    const otpGenerated = sendPhoneOtp(phone);
    setSentOtp(otpGenerated);
    setOtpSent(true);
  };

  // Send OTP for email
  const sendEmailOtpHandler = () => {
    const otpGenerated = sendEmailOtp(email);
    setSentOtp(otpGenerated);
    setOtpSent(true);
  };

  return (
    <motion.div
      className="max-w-md w-full mx-auto mt-1 bg-black bg-opacity-30 rounded-lg p-2 border border-white shadow-lg"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <form
        className="bg-opacity-70 rounded p-6 shadow-[0_2px_16px_-3px_rgba(125,126,131,0.3)] transition-all ease-in-out overflow-hidden duration-700"
        onSubmit={handleSubmit}
      >
        <div className="mb-12">
          <motion.h3
            className="text-white text-3xl font-bold text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Sign Up
          </motion.h3>
        </div>

        <div className="mb-6 flex justify-center items-center">
          <motion.button
            type="button"
            className={`text-sm px-4 py-2 mr-4 rounded transition-all duration-300 ease-in-out transform ${
              !isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
            } hover:scale-105`}
            onClick={() => setIsPhone(false)}
          >
            Sign Up with Email
          </motion.button>
          <motion.button
            type="button"
            className={`text-sm px-4 py-2 rounded transition-all duration-300 ease-in-out transform ${
              isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
            } hover:scale-105`}
            onClick={() => setIsPhone(true)}
          >
            Sign Up with Phone
          </motion.button>
        </div>

        {!isPhone && (
          <motion.div className="mt-6">
            <input
              name="email"
              type="email"
              required
              className="bg-transparent w-full text-sm text-white border-b border-white focus:white pl-2 pr-8 py-3 outline-none placeholder:text-white transition-all duration-300"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
        )}

        {isPhone && (
          <motion.div className="mt-6">
            <input
              name="phone"
              type="tel"
              required
              className="bg-transparent w-full text-sm text-white border-b border-white focus:white pl-2 pr-8 py-3 outline-none placeholder:text-white transition-all duration-300"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </motion.div>
        )}

        {otpSent && (
          <motion.div className="mt-6">
            <input
              name="otp"
              type="text"
              required
              className="bg-transparent w-full text-sm text-white border-b border-white focus:border-white-800 pl-2 pr-8 py-3 outline-none placeholder:text-white transition-all duration-300"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </motion.div>
        )}

        {error && <div className="text-red-500 text-center mt-2">{error}</div>}

        <motion.div className="mt-6 flex justify-center">
          <motion.button
            type="button"
            className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg py-2 px-6 shadow-lg"
            onClick={isPhone ? sendPhoneOtpHandler : sendEmailOtpHandler}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading
              ? "Loading..."
              : otpSent
              ? "Verify OTP"
              : isPhone
              ? "Send Phone OTP"
              : "Send Email OTP"}
          </motion.button>
        </motion.div>

        <motion.div className="mt-6 flex justify-center items-center space-x-4">
          <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
            <FaGoogle size={20} className="mr-2" /> Google
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
            <IoLogoApple size={20} className="mr-2" /> Apple ID
          </button>
        </motion.div>

        <motion.p className="text-gray-300 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login here
          </Link>
        </motion.p>

        <hr className="my-6 border-gray-400" />
      </form>
    </motion.div>
  );
};

export default SignupForm;
