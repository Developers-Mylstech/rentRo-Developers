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


// import React, { useState } from "react";
// import LoginForm from "../Components/form/LoginForm";
// import SignupForm from "../Components/form/SignupForm";
// import BottomNav from "../Components/widget/BottomNav";

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
//         {/* Main Container */}
//         <div className="flex flex-col md:flex-row w-full max-w-6xl h-[80vh] rounded-2xl overflow-hidden shadow-xl">
//           {/* Left Section - Image */}
//           <div className="hidden md:flex w-full md:w-1/2 relative h-full">
//             <img 
//               src="https://img.freepik.com/free-photo/industrial-water-purification-system-clear-liquid-flowing-through-tubes-advanced-technology_632498-60481.jpg" 
//               alt="Auth Visual"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//             <div className="absolute bottom-10 left-10 z-20 text-white">
//               <h2 className="text-4xl font-bold mb-2">
//                 {isLogin ? "Welcome Back" : "Join Us"}
//               </h2>
//               <p className="text-lg">
//                 {isLogin ? "Sign in to access your account" : "Create your account today"}
//               </p>
//             </div>
//           </div>

//           {/* Right Section - Auth Form */}
//           <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-100 h-full">
//             <div className="w-full max-w-md px-6 py-8">
//               {/* Mobile Header */}
//               <div className="md:hidden text-center mb-6">
//                 <h1 className="text-3xl font-bold text-blue-600">AquaConnect</h1>
//                 <p className="text-gray-600 mt-2">
//                   {isLogin ? "Welcome back! Please login to your account" : "Create a new account"}
//                 </p>
//               </div>
              
//               {/* Auth Form */}
//               {isLogin ? <LoginForm /> : <SignupForm />}

//               {/* Toggle Link */}
//               <div className="mt-6 text-center text-sm text-gray-700">
//                 <span>
//                   {isLogin ? "Don’t have an account?" : "Already have an account?"}
//                 </span>{" "}
//                 <button
//                   onClick={toggleAuthMode}
//                   className="text-blue-600 hover:text-blue-800 font-medium underline focus:outline-none"
//                 >
//                   {isLogin ? "Sign up here" : "Sign in here"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <BottomNav />
//     </>
//   );
// };

// export default AuthPage;
