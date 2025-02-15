// import React from "react";
// import "../index.css";

// const Loader = () => {
//   return (
//     <div className="h-[100vh] w-full border flex justify-center items-center">
//         <div className="spinner-square ">
//       <div className="square-1 square"></div>
//       <div className="square-2 square"></div>
//       <div className="square-3 square"></div>
//     </div>
//     </div>
//   );
// };

// export default Loader;
import React from "react";
import "./Loader.css"; // Ensure this path is correct

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="shape">
        <div className="wave"></div>
      </div>
    </div>
  );
}

export default Loader;
