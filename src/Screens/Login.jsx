import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loginimage from "../assets/Loginimage.jpeg";
import BottomNav from "../Components/BottomNav";


// Mock function to simulate login (to be replaced with actual API call)
const handleLoginLogic = (email, password, rememberMe) => {
  // You can replace this with actual authentication logic
  console.log("Logging in with: ", { email, password, rememberMe });
  // For example, make an API call and handle success/error responses
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
    // Calling the function handling the login logic
    handleLoginLogic(email, password, rememberMe);
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
      <button type="submit" className="w-full py-2 text-sm font-semibold tracking-wide rounded text-black bg-white hover:bg-[#222] hover:text-[white] focus:outline-none">
        Log in
      </button>

      <p className="text-white text-sm text-center mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-white font-extrabold hover:underline">
          Register here
        </Link>
      </p>
    </form>
  </div>
</div>
      <BottomNav/>
</>

  );
};

export default Login;
