import React from "react";
import SingupImage from "../assets/SingupImage.jpeg";
import SignupForm from "../Components/form/SignupForm";

const Signup = () => {
  return (
    <>
      <div
        className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
        style={{
          backgroundImage: `url(${SingupImage})`,
        }}
      >
        <div className="max-w-md w-full mx-auto mt-1 bg-black bg-opacity-10 rounded-lg p-2 border border-white shadow-lg">
          <SignupForm /> 
        </div>
      </div>
      {/* <BottomNav /> */}
    </>
  );
};

export default Signup;
