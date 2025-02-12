// import React, { useEffect } from "react";
// import "tailwindcss/tailwind.css";
// import '../Components/OceanScene.css';

// const OceanScene = ({ pageType }) => {
//   useEffect(() => {
//     const bubbles = document.querySelectorAll(".bubble");
//     bubbles.forEach((bubble) => {
//       bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
//       bubble.style.animationDelay = `${Math.random() * -10}s`;
//     });
//   }, []);

//   const renderContent = () => {
//     if (pageType === "services") {
//       return (
//         <div className="text-white text-2xl">Services Content Here</div>
//       );
//     } else if (pageType === "rental") {
//       return (
//         <div className="text-white text-2xl">Rental Products Content Here</div>
//       );
//     }
//   };

//   return (
//     <div className="relative w-screen h-[50vh] overflow-hidden bg-gradient-to-b from-sky-600 to-sky-900 flex items-center justify-center">
//       {/* Bubbles */}
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className={`bubble absolute opacity-10 rounded-full animate-bubble`}
//           style={{
//             width: "40px",
//             height: "40px",
//             left: `${Math.random() * 100}%`,
//             bottom: "20px", // Positioned 20px from the bottom
//             backgroundColor: "rgba(247, 247, 247, 0.1)",
//           }}
//         ></div>
//       ))}

//       {/* Octocat */}
//       <div
//         id="octocat"
//         className="absolute w-[150px] h-[225px] bg-cover bg-no-repeat right-[-200px] top-1/2 transform -translate-y-1/2 animate-swim "
//         style={{
//           backgroundImage:
//             "url(https://raw.githubusercontent.com/codypearce/codepen-files/main/pens/octocat/octocat.png)",
//         }}
//       ></div>

//       {/* Render Content Based on Page Type */}
//       {renderContent()}
//     </div>
//   );
// };

// export default OceanScene;


import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "tailwindcss/tailwind.css";
import '../Components/OceanScene.css';

const OceanScene = () => {
  const location = useLocation();

  useEffect(() => {
    const bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach((bubble) => {
      bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
      bubble.style.animationDelay = `${Math.random() * -10}s`;
    });
  }, []);

  const getTitleText = () => {
    if (location.pathname.includes("rent")) {
      return "Our Rental Service";
    } else if (location.pathname.includes("services")) {
      return "Our Services";
    } else if (location.pathname.includes("sale")) {
      return "Our Sailing Product";
    }
    return "";
  };

  return (
    <div className="relative w-full h-[50vh] overflow-hidden bg-gradient-to-b from-sky-600 to-sky-900 flex items-center justify-center">
      
      {/* Bubbles */}
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
      <h1 className="absolute text-white text-4xl font-bold drop-shadow-lg">
        {getTitleText()}
      </h1>
    </div>
  );
};

export default OceanScene;
