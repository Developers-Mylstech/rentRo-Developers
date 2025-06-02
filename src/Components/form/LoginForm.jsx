// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthStore from "../../Context/AuthContext";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const { initiateAuth, verifyOTP } = useAuthStore();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setError("");
//   };

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!email) {
//       setError("Please enter your Email");
//       return;
//     }

//     try {
//       const payload = {
//         email: email
//       };

//       await initiateAuth(payload);
//       setOtpSent(true);
//       // Store email in localStorage
//       localStorage.setItem('userEmail', email);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     if (!otp) {
//       setError("Please enter OTP");
//       return;
//     }

//     try {
//       const storedEmail = localStorage.getItem('userEmail');
//       const payload = {
//         email: storedEmail,
//         otp: otp
//       };

//       await verifyOTP(payload);
//       localStorage.removeItem('userEmail'); // Clean up
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-[50vh] md:h-[60vh] shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)] bg-black bg-opacity-20 rounded-lg border text-white md:mr-10">
//       <div className="w-full max-w-md p-8 rounded-xl text-center">
//         <h2 className="text-3xl font-light text-white mb-6">Login</h2>
        
//         {/* {error && (
//           <div className="text-red-500 mb-4">
//             {error}
//           </div>
//         )} */}

//         <form className="space-y-4">
//           <input
//             className="w-full p-3 border text-white placeholder:text-white rounded-full bg-transparent text-center focus:outline-none"
//             placeholder="Enter your Email"
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//           />

//           {!otpSent && (
//             <button
//               type="button"
//               onClick={handleSendOtp}
//               className="w-full p-3 rounded-full bg-gradient-to-r from-[#0a448b] to-[#38a3d4cf] text-white"
//             >
//               Send OTP
//             </button>
//           )}

//           {otpSent && (
//             <>
//               <input
//                 className="w-full p-3 border text-white placeholder:text-white rounded-full bg-transparent text-center focus:outline-none"
//                 placeholder="Enter OTP"
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={handleOtpSubmit}
//                 className="w-full p-3 rounded-full bg-gradient-to-r from-[#0a448b] to-[#0e86bdcf] text-white"
//               >
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </form>

//         <p className="mt-4 text-white">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-white font-bold hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../Context/AuthContext";
import { FiMail, FiKey, FiArrowRight } from "react-icons/fi";

function Login() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { initiateAuth, verifyOTP } = useAuthStore();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const payload = { email };
      await initiateAuth(payload);
      setOtpSent(true);
      localStorage.setItem('userEmail', email);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    try {
      const storedEmail = localStorage.getItem('userEmail');
      const payload = { email: storedEmail, otp };
      await verifyOTP(payload);
      localStorage.removeItem('userEmail');
 
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-10  backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white border-opacity-20">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-center">
            <h2 className="text-3xl font-light text-white">Welcome Back</h2>
            <p className="text-blue-100 mt-1">Login with your email</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-200 rounded-lg text-center">
                {error}
              </div>
            )}

            <form className="space-y-6 w-full p-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  className={`w-full pl-10 pr-4 py-3 bg-white bg-opacity-5 border ${
                    otpSent ? "border-blue-400" : "border-white border-opacity-20"
                  } rounded-full text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={otpSent || isLoading}
                />
              </div>

              {otpSent && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiKey className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-full text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Enter 6-digit OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                    disabled={isLoading}
                  />
                </div>
              )}

              <button
                type="button"
                onClick={otpSent ? handleOtpSubmit : handleSendOtp}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-full font-medium ${
                  isLoading
                    ? "bg-blue-400"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                } text-white shadow-md transition-all duration-300 flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {otpSent ? "Verifying..." : "Sending..."}
                  </>
                ) : (
                  <>
                    {otpSent ? "Verify OTP" : "Send OTP"}
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-blue-200">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-white hover:text-blue-100 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
