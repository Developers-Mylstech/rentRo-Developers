// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const sendEmailOtp = (email) => {
//   console.log(`Sending OTP to email: ${email}`);
//   return "1234";
// };

// const sendPhoneOtp = (phone) => {
//   console.log(`Sending OTP to phone: ${phone}`);
//   return "1234";
// };

// const handleLoginLogic = (email, phone, otp, rememberMe, isPhone) => {
//   console.log("Logging in with: ", { email, phone, otp, rememberMe, isPhone });
// };

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isPhone, setIsPhone] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [emailOtpSent, setEmailOtpSent] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePhoneChange = (e) => setPhone(e.target.value);
//   const handleOtpChange = (e) => setOtp(e.target.value);
//   const handleRememberMeChange = () => setRememberMe(!rememberMe);

//   const sendEmailOtpHandler = () => {
//     if (!email) {
//       setError("Please enter a valid email address");
//       return;
//     }
//     setError("");
//     sendEmailOtp(email);
//     setOtpSent(true);
//     setEmailOtpSent(true);
//   };

//   const sendPhoneOtpHandler = () => {
//     if (!phone) {
//       setError("Please enter a valid phone number");
//       return;
//     }
//     setError("");
//     sendPhoneOtp(phone);
//     setOtpSent(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!isPhone && !email) {
//       setError("Please enter a valid email");
//       return;
//     }

//     if (isPhone && otp !== "1234") {
//       setError("Invalid OTP. Please try again.");
//       return;
//     }

//     if (!isPhone && emailOtpSent && otp !== "1234") {
//       setError("Invalid OTP. Please try again.");
//       return;
//     }

//     handleLoginLogic(email, phone, otp, rememberMe, isPhone);
//     navigate("/home");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-12">
//         <h3 className="text-white text-3xl font-bold text-center">Log in</h3>
//       </div>

//       <div className="mb-6 flex justify-center items-center">
//         <button
//           type="button"
//           className={`text-sm px-4 py-2 mr-4 rounded ${
//             !isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
//           }`}
//           onClick={() => setIsPhone(false)}
//         >
//           Log In with Email
//         </button>
//         <button
//           type="button"
//           className={`text-sm px-4 py-2 rounded ${
//             isPhone ? "bg-blue-700 text-white" : "bg-white text-black"
//           }`}
//           onClick={() => setIsPhone(true)}
//         >
//           Log In with Phone
//         </button>
//       </div>

//       {!isPhone && (
//         <div className="mb-6">
//           <input
//             name="email"
//             type="email"
//             required
//             className="w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 p-3 outline-none bg-transparent placeholder:text-white"
//             placeholder="Enter email"
//             value={email}
//             onChange={handleEmailChange}
//           />
//         </div>
//       )}

//       {isPhone && (
//         <div className="mb-6">
//           <input
//             name="phone"
//             type="tel"
//             required
//             className="w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 p-3 outline-none bg-transparent placeholder:text-white"
//             placeholder="Enter phone number"
//             value={phone}
//             onChange={handlePhoneChange}
//           />
//         </div>
//       )}

//       {isPhone && otpSent && (
//         <div className="mb-6">
//           <input
//             name="otp"
//             type="text"
//             required
//             className="w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 p-3 outline-none bg-transparent placeholder:text-white"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={handleOtpChange}
//           />
//         </div>
//       )}

//       {!isPhone && emailOtpSent && (
//         <div className="mb-6">
//           <input
//             name="otp"
//             type="text"
//             required
//             className="w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 p-3 outline-none bg-transparent placeholder:text-white"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={handleOtpChange}
//           />
//         </div>
//       )}

//       {error && <div className="text-red-500 text-center mb-2">{error}</div>}

//       {isPhone && !otpSent && (
//         <div className="mb-6 flex justify-center">
//           <button
//             type="button"
//             className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg py-2 px-6 shadow-lg"
//             onClick={sendPhoneOtpHandler}
//           >
//             Send OTP
//           </button>
          
//         </div>
//       )}

//       {!isPhone && !otpSent && (
//         <div className="mb-6 flex justify-center">
//           <button
//             type="button"
//             className="bg-gradient-to-b from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg py-2 px-6 shadow-lg"
//             onClick={sendEmailOtpHandler}
//           >
//             Send Email OTP
//           </button>
         
//         </div>
//       )}

//       <div className="md:col-span-2 col-span-1 h-full w-full flex justify-center items-center">
//         <button
//           className="bg-gradient-to-b w-full from-blue-400 via-blue-800 to-blue-900 text-white text-sm rounded-lg py-2 px-6 shadow-lg"
//           type="submit"
//         >
//           LogIn
//         </button>
//       </div>

//       <p className="text-white text-sm text-center mt-6">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-white font-extrabold hover:underline">
//           Register here
//         </Link>
//       </p>
//     </form>
//   );
// };

// export default LoginForm;


import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "../../CustomCss/OceanScene.css";

function Login() {

  const [input, setInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (input) {
      setOtpSent(true);
      alert("OTP sent successfully to " + input);
    } else {
      alert("Please enter your Email or Mobile Number first");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      alert("OTP Verified! Redirecting to home...");
      navigate("/home");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-[50vh] md:h-[60vh] shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)]  bg-black bg-opacity-20 rounded-lg  border text-white md:mr-10">
       
      <div className="w-full max-w-md p-8  rounded-xl borer  text-center">
        <h2 className="text-3xl font-light text-white mb-6">Login</h2>
        <form className="space-y-4">
          <input
            className="w-full p-3 border text-white placeholder:text-white rounded-full bg-transparent text-center focus:outline-none"
            placeholder="Email or Mobile Number"
            type="text"
            value={input}
            onChange={handleInputChange}
          />

          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full p-3 rounded-full bg-gradient-to-r from-[#0a448b] to-[#38a3d4cf]  text-white"
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <>
              <input
                className="w-full p-3 border text-white placeholder:text-white rounded-full bg-transparent text-center  focus:outline-none "
                placeholder="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={handleOtpSubmit}
                className="w-full p-3 rounded-full bg-gradient-to-r from-[#0a448b] to-[#0e86bdcf]  text-white"
              >
                Verify OTP
              </button>
            </>
          )}
        </form>
        <p className="mt-4 text-white">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
