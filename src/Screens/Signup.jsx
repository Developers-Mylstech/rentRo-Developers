import React, { useState } from "react";
import { Link } from "react-router-dom";
import SingupImage from "../assets/SingupImage.jpeg";
import BottomNav from "../Components/BottomNav";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, confirmPassword, termsAccepted });
  };

  return (
    <>
      <div
        className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
        style={{
          backgroundImage: `url(${SingupImage})`,
        }}
      >
        <div className="max-w-md w-full mx-auto mt-20 bg-black bg-opacity-10 rounded-lg p-2 border border-white shadow-lg">
          <form
            className="bg-opacity-70 rounded p-6 shadow-[0_2px_16px_-3px_rgba(125,126,131,0.3)]"
            onSubmit={handleSubmit}
          >
            <div className="mb-12">
              <h3 className="text-white text-3xl font-bold text-center">Sign Up</h3>
            </div>

            {/* Email Input */}
            <div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  stroke="white"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div className="mt-6">
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="bg-transparent w-full text-sm text-white border-b border-white focus:border-white-800 pl-2 pr-8 py-3 outline-none placeholder:text-white"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  stroke="white"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mt-6">
              <div className="relative flex items-center">
                <input
                  name="confirm-password"
                  type="password"
                  required
                  className="bg-transparent w-full text-sm text-white border-b border-white focus:border-white-800 pl-2 pr-8 py-3 outline-none placeholder:text-white"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                className="h-4 w-4 border-white rounded"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
                I agree to the{" "}
                <a href="javascript:void(0);" className="text-gray-300 text-white font-semibold hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-12">
              <div className="md:col-span-2 col-span-1 h-full w-full flex justify-center items-center">
                <button
                  className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 
                 text-white text-lg rounded-lg py-2 px-4 shadow-lg
                 shadow-blue-500/50 hover:from-blue-300 hover:to-blue-800
                 transition duration-300 transform hover:-translate-y-1 hover:scale-105 
                 tracking-wider"
                  type="submit"
                >
                  Signup
                </button>
              </div>
              <p className="text-gray-300 text-sm text-center mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-white font-semibold hover:underline">
                  Login here
                </Link>
              </p>
            </div>

            <hr className="my-6 border-gray-400" />

            {/* Social login buttons */}
            <div className="mt-8">
              <button className="w-full bg-red-600 text-white py-2 rounded-lg mb-4 hover:bg-red-700 transition duration-300">
                Sign Up with Google
              </button>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Sign Up with Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
      <BottomNav />
      <ScrollToTopButton />
    </>
  );
};

export default Signup;
