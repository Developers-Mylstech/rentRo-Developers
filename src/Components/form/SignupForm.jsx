import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";


function SignUp() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [input, setInput] = useState("");

  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  // Handle email input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  // Handle OTP sending
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (input) {
      setOtpSent(true);
      alert("OTP sent successfully to " + input);
    } else {
      alert("Please enter an email or number first");
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      // Simulating OTP verification
      setIsOtpVerified(true);
      alert("OTP Verified! Redirecting to login...");
      navigate("/login"); // Redirect to login page
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);





  return (
    <div className="h-screen w-full  flex items-center justify-end ">




      <div
        style={{ width: "100%" }}
        className="min-h-screen flex justify-center md:justify-end md:pr-[5%] items-center z-20 bg-transparent  "
      >
        <div className="shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)]  bg-black bg-opacity-20  border  p-4 rounded-2xl  w-full max-w-md mx-6">
          <h2 className="text-5xl text-white text-center">Sign up</h2>
          <p className="text-center text-sm mt-4 text-[#f4ede9]">
            Sign up to continue
          </p>
          <form className="mt-2 space-y-6 px-8">
            {/* Email Field */}
            <input
              className="input-text w-full p-3 border focus:outline-none bg-transparent rounded-lg text-white"
              placeholder="Email or Mobile Number"
              type="text"
              value={input}
              onChange={handleInputChange}
            />

            {/* Send OTP Button */}
            {input && !otpSent && (

              <div className="w-full flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-white mt-4 p-2 buttonlogin rounded-xl border"
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* OTP Input Field */}
            {otpSent && (
              <div>
                <p className="text-center text-white mt-4">
                  Enter the OTP sent to your email:
                </p>
                <input
                  className="input-text w-full p-3 border focus:outline-none bg-transparent rounded-lg text-white placeholder:text-white"
                  placeholder="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div className="w-full flex justify-center items-center">
                  <button
                    type="button"
                    onClick={handleOtpSubmit}
                    className=" text-white mt-4 p-2 buttonlogin rounded-xl border"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 text-white">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Terms and Conditions</label>
            </div>
            {/* Social Login Buttons */}
            <div className="flex justify-around mt-4">
              <button className="social-button flex items-center text-[#fcfcfc]">
                <FaGoogle className="w-6 h-6 mr-2" /> Google
              </button>

              <button className="social-button flex items-center text-[#fffafa]">
                <FaApple className="w-6 h-6 mr-2" /> Apple
              </button>
            </div>

            <p className="mt-4 text-center text-white">
              Already have an account?
              <Link
                to="/login"
                className="text-white font-bold hover:animate-pulse"
              >
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
