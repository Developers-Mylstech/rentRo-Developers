import React from "react";
import Loginimage from "../assets/Loginimage.jpeg";
import BottomNav from "../Components/BottomNav";
import ScrollToTopButton from "../Components/ScrollToTopButton";
import LoginForm from "../Components/form/LoginForm"; // Import the new component

const Login = () => {
  return (
    <>
      <div
        className="flex justify-center items-center font-[sans-serif] h-screen w-full p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${Loginimage})` }}
      >
        <div className="max-w-md w-full mx-auto bg-black bg-opacity-10 rounded-lg p-6 border border-white shadow-lg">
          <LoginForm /> 
        </div>
      </div>
      <BottomNav />
      <ScrollToTopButton />
    </>
  );
};

export default Login;
