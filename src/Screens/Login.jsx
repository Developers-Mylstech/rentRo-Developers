import { useEffect } from "react";
import React from "react";
import Loginimage from "../assets/Loginimage.jpeg";
import LoginForm from "../Components/form/LoginForm"; // Import the new component
import BottomNav from "../Components/widget/BottomNav";

const Login = () => {
  useEffect(() => {
          const bubbles = document.querySelectorAll(".bubble");
          bubbles.forEach((bubble) => {
            bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
            bubble.style.animationDelay = `${Math.random() * -10}s`;
          });
        }, []);
  return (
    <>
      <div
        className="flex justify-center border items-center font-[sans-serif] h-screen w-auto p-4 bg-cover bg-center"
       
      >
        
       <div className="absolute w-full h-screen overflow-hidden bg-gradient-to-b from-sky-600 to-sky-900 flex items-center justify-center">

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`bubble absolute opacity-10 rounded-full animate-bubble`}
          style={{
            width: "40px",
            height: "40px",
            left: `${Math.random() * 100}%`,
            bottom: "20px",
            backgroundColor: "rgba(247, 247, 247, 0.1)",
          }}
        ></div>
      ))}

      {/* Octocat */}
      <div
        id="octocat"
        className="absolute w-[150px] h-[225px] bg-cover bg-no-repeat right-[-200px] top-1/2 transform -translate-y-1/2 animate-swim"
        style={{
          backgroundImage:
            "url(https://raw.githubusercontent.com/codypearce/codepen-files/main/pens/octocat/octocat.png)",
        }}
      ></div>

      {/* Centered Title */}
     
       
       
      
    </div>

        <div className=" w-full z-30 flex md:justify-end justify-center  ">
          <LoginForm /> 
        </div>
      </div>
      <BottomNav />
      
    </>
  );
};

export default Login;
