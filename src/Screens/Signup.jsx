import React, { useState } from "react";
import { Link } from "react-router-dom";
import SingupImage from "../assets/SingupImage.jpeg";
import BottomNav from "../Components/BottomNav";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Add icons for social logins
import { IoLogoApple } from "react-icons/io"; // Apple icon

// Mock functions to simulate OTP sending (replace with actual API calls)
const sendEmailOtp = (email) => {
  console.log(`Sending OTP to email: ${email}`);
  return "1234"; // Simulated OTP sent to email
};

const sendPhoneOtp = (phone) => {
  console.log(`Sending OTP to phone: ${phone}`);
  return "1234"; // Simulated OTP sent to phone
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Flag to show OTP input field
  const [sentOtp, setSentOtp] = useState(""); // Store the sent OTP (for verification)
  const [isPhone, setIsPhone] = useState(false); // Toggle between email and phone input
  const [error, setError] = useState(""); // Error handling state

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle phone input change
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle form submission for both email and phone sign-up
  const handleSubmit = (e) => {
    e.preventDefault();

    // If OTP is sent, validate the OTP
    if (otpSent) {
      if (otp !== sentOtp) {
        setError("Invalid OTP. Please try again.");
        return;
      }
      console.log("OTP Verified successfully");
      // Proceed with actual signup (e.g., call backend API to save user details)
      console.log("Signup successful");
      // Here you can redirect the user to another page (e.g., dashboard or home page)
    } else {
      // Validate email or phone
      if (isPhone && !phone) {
        setError("Please enter a valid phone number.");
        return;
      }
      if (!isPhone && !email) {
        setError("Please enter a valid email address.");
        return;
      }
      setError(""); // Reset any previous error

      // Send OTP based on the selection (email or phone)
      if (isPhone) {
        const otpGenerated = sendPhoneOtp(phone);
        setSentOtp(otpGenerated);
      } else {
        const otpGenerated = sendEmailOtp(email);
        setSentOtp(otpGenerated);
      }

      setOtpSent(true); // Show OTP input field after OTP is sent
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
        style={{
          backgroundImage: `url(${SingupImage})`,
        }}
      >
        <div className="max-w-md w-full mx-auto mt-1 bg-black bg-opacity-10 rounded-lg p-2 border border-white shadow-lg">
          <form
            className="bg-opacity-70 rounded p-6 shadow-[0_2px_16px_-3px_rgba(125,126,131,0.3)]"
            onSubmit={handleSubmit}
          >
            <div className="mb-12">
              <h3 className="text-white text-3xl font-bold text-center">
                Sign Up
              </h3>
            </div>

            {/* Toggle between Email and Phone */}
            <div className="mb-6 flex justify-center items-center">
              <button
                type="button"
                className={`text-sm px-4 py-2 mr-4 rounded ${
                  !isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
                }`}
                onClick={() => setIsPhone(false)}
              >
                Sign Up with Email
              </button>
              <button
                type="button"
                className={`text-sm px-4 py-2 rounded ${
                  isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
                }`}
                onClick={() => setIsPhone(true)}
              >
                Sign Up with Phone
              </button>
            </div>

            {/* Email Input */}
            {!isPhone && (
              <div className="mt-6">
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="bg-transparent w-full text-sm text-white border-b border-white focus:white pl-2 pr-8 py-3 outline-none placeholder:text-white"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            )}

            {/* Phone Input */}
            {isPhone && (
              <div className="mt-6">
                <div className="relative flex items-center">
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="bg-transparent w-full text-sm text-white border-b border-white focus:white pl-2 pr-8 py-3 outline-none placeholder:text-white"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
            )}

            {/* OTP Input */}
            {otpSent && (
              <div className="mt-6">
                <div className="relative flex items-center">
                  <input
                    name="otp"
                    type="text"
                    required
                    className="bg-transparent w-full text-sm text-white border-b border-white focus:border-white-800 pl-2 pr-8 py-3 outline-none placeholder:text-white"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center mt-2">{error}</div>
            )}

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg py-2 px-6 shadow-lg"
              >
                {otpSent
                  ? "Verify OTP"
                  : isPhone
                  ? "Send Phone OTP"
                  : "Send Email OTP"}
              </button>
            </div>

            {/* Social Login Options */}
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
                <FaGoogle size={20} className="mr-2" /> Google
              </button>
          
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
                <IoLogoApple size={20} className="mr-2" /> Apple ID
              </button>
            </div>

            {/* Already have an account? */}
            <p className="text-gray-300 text-sm text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>

            <hr className="my-6 border-gray-400" />
          </form>
        </div>
      </div>
      <BottomNav />
      <ScrollToTopButton />
    </>
  );
};

export default Signup;
