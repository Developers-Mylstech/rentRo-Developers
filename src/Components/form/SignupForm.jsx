// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaGoogle, FaApple } from "react-icons/fa";
// import useAuthStore from "../../Context/AuthContext";

// function SignUp() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "defaultPassword123" // Adding a default password to satisfy the backend requirement
//   });
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const { sendOTP, verifyOTP } = useAuthStore();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.phone) {
//       alert("Please fill in all fields");
//       return;
//     }
    
//     // Add validation for email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     try {
//       await sendOTP(formData);
//       setOtpSent(true);
//     } catch (error) {
//       console.error("Failed to send OTP:", error);
//       alert("Failed to send OTP. Please try again.");
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const verified = await verifyOTP(otp);
//       if (verified) {
//         alert("OTP Verified! Redirecting to login...");
//         navigate("/login");
//       } else {
//         alert("Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("OTP verification failed:", error);
//       alert("OTP verification failed. Please try again.");
//     }
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-end">
//       <div
//         style={{ width: "100%" }}
//         className="min-h-screen flex justify-center md:justify-end md:pr-[5%] items-center z-20 bg-transparent"
//       >
//         <div className="shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)] bg-black bg-opacity-20 border p-4 rounded-2xl w-full max-w-md mx-6">
//           <h2 className="text-5xl text-white text-center">Sign up</h2>
//           <p className="text-center text-sm mt-4 text-[#f4ede9]">
//             Sign up to continue
//           </p>
          
//           <form className="mt-2 space-y-6 px-8">
//             {!otpSent ? (
//               <>
//                 {/* Name Field */}
//                 <input
//                   className="input-text w-full p-3 border focus:outline-none bg-transparent rounded-lg text-white placeholder:text-white"
//                   placeholder="Full Name"
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                 />

//                 {/* Email Field */}
//                 <input
//                   className="input-text w-full p-3 border focus:outline-none bg-transparent rounded-lg text-white placeholder:text-white"
//                   placeholder="Email Address"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />

//                 {/* Phone Field */}
//                 <input
//                   className="input-text w-full p-3 border focus:outline-none bg-transparent rounded-lg text-white placeholder:text-white"
//                   placeholder="Mobile Number"
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />

//                 <div className="w-full flex justify-center items-center">
//                   <button
//                     type="button"
//                     onClick={handleSendOtp}
//                     className="text-white mt-4 p-2 buttonlogin rounded-xl border"
//                   >
//                     Send OTP
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div>
//                 <p className="text-center text-white mt-4">
//                   Enter the OTP sent to your mobile number:
//                 </p>
//                 <input
//                   className="input-text w-full p-3 border focus:outline-none bg-transparent rounded-lg text-white placeholder:text-white"
//                   placeholder="Enter OTP"
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//                 <div className="w-full flex justify-center items-center">
//                   <button
//                     type="button"
//                     onClick={handleOtpSubmit}
//                     className="text-white mt-4 p-2 buttonlogin rounded-xl border"
//                   >
//                     Verify OTP
//                   </button>
//                 </div>
//               </div>
//             )}

//             <div className="flex items-center gap-3 text-white">
//               <input type="checkbox" id="terms" />
//               <label htmlFor="terms">Terms and Conditions</label>
//             </div>

//             {/* Social Login Buttons */}
//             <div className="flex justify-around mt-4">
//               <button className="social-button flex items-center text-[#fcfcfc]">
//                 <FaGoogle className="w-6 h-6 mr-2" /> Google
//               </button>
//               <button className="social-button flex items-center text-[#fffafa]">
//                 <FaApple className="w-6 h-6 mr-2" /> Apple
//               </button>
//             </div>

//             <p className="mt-4 text-center text-white">
//               Already have an account?{" "}
//               <Link to="/login" className="text-white font-bold hover:animate-pulse">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;





import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import useAuthStore from "../../Context/AuthContext";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "defaultPassword123"
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { sendOTP, verifyOTP } = useAuthStore();

  useEffect(() => {
    // Clear errors when user starts typing
    const timer = setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        setErrors({});
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await sendOTP(formData);
      setOtpSent(true);
      // Save email to localStorage
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('user', formData.name);
      loa
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setErrors({ server: "Failed to send OTP. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSavedEmail = () => {
    return localStorage.getItem('userEmail') || '';
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
   
    if (!otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    const payload = {
      email: getSavedEmail(),
      otp: otp
    };

  


    setIsSubmitting(true);
    try {
      const verified = await verifyOTP(payload);
      if (verified) {
        alert("Account created successfully! Redirecting to login...");
        // Clear saved email after successful verification
        // localStorage.removeItem('userEmail');
        navigate("/");
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrors({ server: "OTP verification failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl p-8 shadow-xl">
          <h2 className="text-4xl font-bold text-center text-white mb-2">Sign Up</h2>
          <p className="text-center text-white text-opacity-80 mb-8">
            Create your account to continue
          </p>

          {errors.server && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-200 rounded-lg text-center">
              {errors.server}
            </div>
          )}

          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <input
                className={`w-full p-3 bg-white bg-opacity-5 border ${errors.name ? 'border-red-400' : 'border-white border-opacity-20'} rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={otpSent}
              />
              {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <input
                className={`w-full p-3 bg-white bg-opacity-5 border ${errors.email ? 'border-red-400' : 'border-white border-opacity-20'} rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={otpSent}
              />
              {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <input
                className={`w-full p-3 bg-white bg-opacity-5 border ${errors.phone ? 'border-red-400' : 'border-white border-opacity-20'} rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Mobile Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={otpSent}
              />
              {errors.phone && <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>}
            </div>

            {/* OTP Field (shown only after OTP is sent) */}
            {otpSent && (
              <div>
               
                <input
                  className={`w-full p-3 bg-white bg-opacity-5 border ${errors.otp ? 'border-red-400' : 'border-white border-opacity-20'} rounded-lg text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter 6-digit OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />
                {errors.otp && <p className="mt-1 text-red-400 text-sm">{errors.otp}</p>}
              </div>
            )}

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 h-4 w-4 rounded border-white border-opacity-50 bg-white bg-opacity-10 focus:ring-blue-400"
                required
              />
              <label htmlFor="terms" className="text-white text-opacity-80 text-sm">
                I agree to the Terms and Conditions
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={otpSent ? handleOtpSubmit : handleSendOtp}
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all duration-200 flex justify-center items-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {otpSent ? "Verifying..." : "Sending OTP..."}
                </>
              ) : (
                otpSent ? "Verify OTP" : "Send OTP"
              )}
            </button>

            {/* Social Login Section */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white border-opacity-20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-transparent text-white text-opacity-80 text-sm">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white py-2 px-4 rounded-lg transition-all duration-200"
              >
                <FaGoogle /> Google
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white py-2 px-4 rounded-lg transition-all duration-200"
              >
                <FaApple /> Apple
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-white text-opacity-80">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 hover:text-blue-200 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
