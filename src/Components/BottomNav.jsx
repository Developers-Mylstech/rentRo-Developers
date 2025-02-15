// src/Components/BottomNav.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed left-0 bottom-0  w-full bg-white shadow-md border-t border-gray-200 z-50 rounded-t-lglg ">
      <ul className="flex justify-around items-center text-gray-600 py-2">
        <li
          className="flex flex-col items-center cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-xs">Home</span>
        </li>

        <li
          className="flex flex-col items-center cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/shop")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18m-9 5h9"
            />
          </svg>
          <span className="text-xs">Shop</span>
        </li>

        <li
          className="flex flex-col items-center cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/services")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs">Services</span>
        </li>

        <li
          className="flex flex-col items-center cursor-pointer hover:text-blue-500"
          onClick={() => navigate("/login")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A9 9 0 1118.364 4.56m-1.415 1.414A7 7 0 106.343 19.218"
            />
          </svg>
          <span className="text-xs">Account</span>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const BottomNav = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
//           isSidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="p-4 border-b flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Services</h2>
//           <button
//             onClick={toggleSidebar}
//             className="text-gray-600 hover:text-red-600"
//           >
//             ✕
//           </button>
//         </div>
//         <ul className="p-4 space-y-4">
//           <li
//             className="cursor-pointer hover:text-blue-600"
//             onClick={() => {
//               navigate("/service-1");
//               setIsSidebarOpen(false);
//             }}
//           >
//             Service 1
//           </li>
//           <li
//             className="cursor-pointer hover:text-blue-600"
//             onClick={() => {
//               navigate("/service-2");
//               setIsSidebarOpen(false);
//             }}
//           >
//             Service 2
//           </li>
//           <li
//             className="cursor-pointer hover:text-blue-600"
//             onClick={() => {
//               navigate("/service-3");
//               setIsSidebarOpen(false);
//             }}
//           >
//             Service 3
//           </li>
//         </ul>
//       </div>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       {/* Bottom Navigation */}
//       <nav className="md:hidden fixed left-0 bottom-0 w-full bg-white shadow-md border-t border-gray-200 z-50 rounded-t-lglg">
//         <ul className="flex justify-around items-center text-gray-600 py-2">
//           <li
//             className="flex flex-col items-center cursor-pointer hover:text-blue-500"
//             onClick={() => navigate("/")}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
//               />
//             </svg>
//             <span className="text-xs">Home</span>
//           </li>

//           <li
//             className="flex flex-col items-center cursor-pointer hover:text-blue-500"
//             onClick={() => navigate("/shop")}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 7h18M3 12h18m-9 5h9"
//               />
//             </svg>
//             <span className="text-xs">Shop</span>
//           </li>

//           <li
//             className="flex flex-col items-center cursor-pointer hover:text-blue-500"
//             onClick={toggleSidebar}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//               />
//             </svg>
//             <span className="text-xs">Services</span>
//           </li>

//           <li
//             className="flex flex-col items-center cursor-pointer hover:text-blue-500"
//             onClick={() => navigate("/login")}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5.121 17.804A9 9 0 1118.364 4.56m-1.415 1.414A7 7 0 106.343 19.218"
//               />
//             </svg>
//             <span className="text-xs">Account</span>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default BottomNav;

