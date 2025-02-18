import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loginimage from "../assets/Loginimage.jpeg";
import { motion } from "framer-motion";
import LoginForm from "../Components/form/LoginForm";

// Mock OTP Functions
const sendEmailOtp = (email) => "1234";
const sendPhoneOtp = (phone) => "1234";
const handleLoginLogic = (email, phone, otp, rememberMe, isPhone) => {
  console.log("Logging in with: ", { email, phone, otp, rememberMe, isPhone });
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginLogic(email, phone, otp, rememberMe, isPhone);
    navigate("/home");
  };

  return (
    <>
      <motion.div
        className="flex justify-center items-center h-screen w-full p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${Loginimage})` }}
      >
        <LoginForm
          email={email}
          phone={phone}
          otp={otp}
          rememberMe={rememberMe}
          isPhone={isPhone}
          otpSent={otpSent}
          emailOtpSent={emailOtpSent}
          error={error}
          handleEmailChange={(e) => setEmail(e.target.value)}
          handlePhoneChange={(e) => setPhone(e.target.value)}
          handleOtpChange={(e) => setOtp(e.target.value)}
          handleRememberMeChange={(isPhoneLogin) => setIsPhone(isPhoneLogin)}
          sendEmailOtpHandler={() => setEmailOtpSent(true)}
          sendPhoneOtpHandler={() => setOtpSent(true)}
          handleSubmit={handleSubmit}
        />
      </motion.div>
      {/* <BottomNav />
      <ScrollToTopButton / */}
    </>
  );
};

export default Login;
