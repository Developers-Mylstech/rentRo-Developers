import React from "react";
import SignupForm from "../Components/form/SignupForm";
import SingupImage from "../assets/SingupImage.jpeg";
import BottomNav from "../Components/widget/BottomNav";

const Signup = () => {
  return (
    <>
      <div
        className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
        style={{ backgroundImage: `url(${SingupImage})`, backgroundSize: "cover" }}
      >
        <SignupForm />
      </div>
      <BottomNav />
    </>
  );
};

export default Signup;
