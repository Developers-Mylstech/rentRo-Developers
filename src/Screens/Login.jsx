import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loginimage from "../assets/Loginimage.jpeg";
import BottomNav from "../Components/BottomNav";
import ScrollToTopButton from "../Components/ScrollToTopButton";

// Mock function to simulate login (to be replaced with actual API call)
const handleLoginLogic = (email, password, rememberMe) => {
  console.log("Logging in with: ", { email, password, rememberMe });
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginLogic(email, password, rememberMe);
  };

  // Simulated Apple ID Login (this could be an API call to authenticate with Apple)
  const handleAppleLogin = () => {
    console.log("Apple ID login triggered");
    // Add actual Apple authentication logic here
  };

  // Simulated OTP login
  const handleOtpLogin = () => {
    console.log("OTP login triggered");
    // Navigate to an OTP page or open a modal here
  };

  // Simulated Google Login (this would need actual Google API integration)
  const handleGoogleLogin = () => {
    console.log("Google login triggered");
    // Add actual Google authentication logic here (e.g., using Google Identity Services SDK)
  };

  // Simulated Facebook Login (this would need actual Facebook API integration)
  const handleFacebookLogin = () => {
    console.log("Facebook login triggered");
    // Add actual Facebook authentication logic here (e.g., using Facebook Login SDK)
  };

  return (
    <>
      <div
        className="flex justify-center items-center font-[sans-serif] h-screen w-full p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Loginimage})`,
        }}
      >
        <div className="max-w-md w-full mx-auto bg-black bg-opacity-10 rounded-lg p-6 border border-white  shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-12">
              <h3 className="text-white text-3xl font-bold text-center">Log in</h3>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <input
                name="email"
                type="text"
                required
                className="w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 p-3 outline-none bg-transparent placeholder:text-white"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <input
                name="password"
                type="password"
                required
                className="w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 p-3 outline-none bg-transparent placeholder:text-white"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-sm text-white">
                <input type="checkbox" className="mr-2" checked={rememberMe} onChange={handleRememberMeChange} />
                Remember me
              </label>
              <a href="#" className="text-white text-sm font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 col-span-1 h-full w-full flex justify-center items-center mt-6">
              <button
                className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 
                   text-white  text-lg rounded-lg py-2 px-4  shadow-lg
                   shadow-blue-500/50 hover:from-blue-300 hover:to-blue-800
                   transition duration-300 transform hover:-translate-y-1 hover:scale-105 
                   tracking-wider"
                type="submit"
              >
                Login
              </button>
            </div>

            <p className="text-white text-sm text-center mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-white font-extrabold hover:underline">
                Register here
              </Link>
            </p>
          </form>

          {/* Social Login Options */}
          <div className="mt-8">
            {/* Apple ID Login */}
            <button
              className="w-full bg-black text-white py-2 rounded-lg mb-4 hover:bg-gray-800 transition duration-300"
              onClick={handleAppleLogin}
            >
              Login with Apple ID
            </button>

            {/* OTP Login */}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700 transition duration-300"
              onClick={handleOtpLogin}
            >
              Login with OTP (Mobile)
            </button>

            {/* Google Login */}
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg mb-4 hover:bg-red-700 transition duration-300"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>

            {/* Facebook Login */}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 hover:bg-blue-700 transition duration-300"
              onClick={handleFacebookLogin}
            >
              Login with Facebook
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
      <ScrollToTopButton />
    </>
  );
};

export default Login;
