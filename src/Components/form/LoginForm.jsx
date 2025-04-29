import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../Context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { initiateAuth, verifyOTP } = useAuthStore();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your Email");
      return;
    }

    try {
      const payload = {
        email: email
      };

      await initiateAuth(payload);
      setOtpSent(true);
      // Store email in localStorage
      localStorage.setItem('userEmail', email);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    try {
      const storedEmail = localStorage.getItem('userEmail');
      const payload = {
        email: storedEmail,
        otp: otp
      };

      await verifyOTP(payload);
      localStorage.removeItem('userEmail'); // Clean up
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[50vh] md:h-[60vh] shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)] bg-black bg-opacity-20 rounded-lg border text-white md:mr-10">
      <div className="w-full max-w-md p-8 rounded-xl text-center">
        <h2 className="text-3xl font-light text-white mb-6">Login</h2>
        
        {/* {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )} */}

        <form className="space-y-4">
          <input
            className="w-full p-3 border text-white placeholder:text-white rounded-full bg-transparent text-center focus:outline-none"
            placeholder="Enter your Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />

          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full p-3 rounded-full bg-gradient-to-r from-[#0a448b] to-[#38a3d4cf] text-white"
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <>
              <input
                className="w-full p-3 border text-white placeholder:text-white rounded-full bg-transparent text-center focus:outline-none"
                placeholder="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                onClick={handleOtpSubmit}
                className="w-full p-3 rounded-full bg-gradient-to-r from-[#0a448b] to-[#0e86bdcf] text-white"
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
