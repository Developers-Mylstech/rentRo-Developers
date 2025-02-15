// import { SiVisa } from "react-icons/si";
// import { FaCcMastercard } from "react-icons/fa";
// import { useLocation } from "react-router-dom";
// import "./Waves.css";
// import rentroLogo from "../assets/renroLogo.png";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   const location = useLocation();
//   return (
//     <footer
//       className={`relative  overflow-hidden bg-gradient-to-b md:mb-0 ${
//         location.pathname != "/signup" || "/login" ? "mb-12" : "mb-0"
//       } from-blue-950 to-blue-900 text-white py-12 px-6 md:px-16 border-t`}
//     >
//       {/* Footer Content */}
//       <div className=" md:px-16  mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 z-10">
//         {/* Company Info */}
//         <div>
//           <img
//             src={rentroLogo}
//             alt="Logo"
//             className="h-6 md:h-12 w-auto object-cover"
//           />
//           <p className="text-sm mt-2 text-white">
//             Established in 2019, RENT RO aims to make water purification
//             affordable with rental plans.
//           </p>
//         </div>

//         {/* About Us Links */}
        // <div>
        //   <h3 className="font-semibold text-lg mb-3">About Us</h3>
        //   <ul className="space-y-2 text-sm">
        //     <li>
        //       <a href="#" className="hover:underline">
        //         Home
        //       </a>
        //     </li>
        //     <li>
        //       <a href="#" className="hover:underline">
        //         About Us
        //       </a>
        //     </li>
        //     <li>
        //       <a href="#" className="hover:underline">
        //         Contact Us
        //       </a>
        //     </li>
        //     <li>
        //       <a href="#" className="hover:underline">
        //         Shop
        //       </a>
        //     </li>
        //   </ul>
        // </div>

//         {/* Services */}
//         <div>
//           <h3 className="font-semibold text-lg mb-3">Our Services</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link to="/domesticservices" href="#" className="hover:underline">
//                 Domestic Service
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:underline">
//                 Commercial Service
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:underline">
//                 Industrial Service
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:underline">
//                 RO Services
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-semibold text-lg mb-3">Get Help</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link to="/faq" href="#" className="hover:underline">
//                 FAQ
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:underline">
//                 Contact Us
//               </Link>
//             </li>
           
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h3 className="font-semibold text-lg mb-3 ">Contact Us</h3>
//           <p className="text-sm text-white">
//             <strong>Reach Us:</strong> Dubai, UAE
//           </p>
//           <p className="text-sm mt-2 text-white">
//             <strong>Call:</strong> +971 50 670 9963
//           </p>
//           <p className="text-sm mt-2 text-white">
//             <strong>Email:</strong>{" "}
//             <Link
//               to="/"
//               href="mailto:info@rentro.ae"
//               className="text-white hover:underline"
//             >
//               info@rentro.ae
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div
//         style={{ borderTop: "1px solid #ffffffb2" }}
//         className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm  pt-4 z-20"
//       >
//         <p>We accept:</p>
//         <div className="flex items-center space-x-4 mt-2 md:mt-0">
//           <SiVisa className="text-black text-2xl z-10" />
//           <FaCcMastercard className="text-black text-2xl z-10" />
//         </div>
//         <p className="mt-2 md:mt-0">© 2025 RENT RO, All rights reserved.</p>
//       </div>

//       {/* Waves Animation */}
//       <div className="absolute bottom-0 left-0 w-full">
//         {/* Waves Container */}
//         <svg
//           className="waves"
//           viewBox="0 24 150 28"
//           preserveAspectRatio="none"
//           shapeRendering="auto"
//         >
//           <defs>
//             <path
//               id="gentle-wave"
//               d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
//             />
//           </defs>
//           <g className="parallax">
//             <use
//               xlinkHref="#gentle-wave"
//               x="48"
//               y="0"
//               fill="rgba(255,255,255,0.7)"
//             />
//             <use
//               xlinkHref="#gentle-wave"
//               x="48"
//               y="3"
//               fill="rgba(255,255,255,0.5)"
//             />
//             <use
//               xlinkHref="#gentle-wave"
//               x="48"
//               y="5"
//               fill="rgba(255,255,255,0.3)"
//             />
//             <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
//           </g>
//         </svg>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import { useState } from "react";
import { SiVisa } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import rentroLogo from "../assets/renroLogo.png";
import "./Waves.css";

const Footer = () => {
  const location = useLocation();

  // State for Dropdowns
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer
  className={`relative overflow-hidden bg-gradient-to-b md:mb-0 ${
    location.pathname !== "/signup" && location.pathname !== "/login"
      ? "mb-12"
      : "mb-0"
  } from-blue-950 to-blue-900 text-white py-12 px-6 md:px-8 border-t`}
>
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-8 z-10">
    {/* Company Info */}
    <div className="md:pl-10">
      <img
        src={rentroLogo}
        alt="Logo"
        className="h-6 md:h-12 w-auto object-cover"
      />
      <p className="text-sm mt-2 text-white">
        Established in 2019, RENT RO aims to make water purification
        affordable with rental plans.
      </p>
    </div>

    <div>
          <h3 className="font-semibold text-lg mb-3">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:underline">
                About Us
              </Link>
            </li>
            
            <li>
              <Link to="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
          </ul>
        </div>

    {/* Our Services */}
    <div>
      <h3
        className="font-semibold text-lg mb-3 flex items-center justify-between cursor-pointer md:cursor-auto"
        onClick={() => setIsServicesOpen(!isServicesOpen)}
      >
        Our Services
        {isServicesOpen ? (
          <FiChevronUp className="md:hidden" />
        ) : (
          <FiChevronDown className="md:hidden" />
        )}
      </h3>
      <ul
        className={`space-y-2 text-sm ${
          isServicesOpen ? "block" : "hidden"
        } md:block`}
      >
        <li>
          <Link to="/domesticservice" className="hover:underline">
            Domestic Service
          </Link>
        </li>
        <li>
          <Link to="/commercialservice" className="hover:underline">
            Commercial Service
          </Link>
        </li>
        <li>
          <Link to="/industrialservice" className="hover:underline">
            Industrial Service
          </Link>
        </li>
        <li>
          <Link to="/roservices" className="hover:underline">
            RO Services
          </Link>
        </li>
      </ul>
    </div>

    {/* Get Help */}
    <div>
      <h3
        className="font-semibold text-lg mb-3 flex items-center justify-between cursor-pointer md:cursor-auto"
        onClick={() => setIsHelpOpen(!isHelpOpen)}
      >
        Get Help
        {isHelpOpen ? (
          <FiChevronUp className="md:hidden" />
        ) : (
          <FiChevronDown className="md:hidden" />
        )}
      </h3>
      <ul
        className={`space-y-2 text-sm ${
          isHelpOpen ? "block" : "hidden"
        } md:block`}
      >
        <li>
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </li>
      </ul>
    </div>

    {/* Contact Us */}
    <div>
      <h3
        className="font-semibold text-lg mb-3 flex items-center justify-between cursor-pointer md:cursor-auto"
        onClick={() => setIsContactOpen(!isContactOpen)}
      >
        Contact Us
        {isContactOpen ? (
          <FiChevronUp className="md:hidden" />
        ) : (
          <FiChevronDown className="md:hidden" />
        )}
      </h3>
      <div
        className={`space-y-2 text-sm ${
          isContactOpen ? "block" : "hidden"
        } md:block`}
      >
        <p className="text-sm text-white">
          <strong>Reach Us:</strong> Dubai, UAE
        </p>
        <p className="text-sm mt-2 text-white">
          <strong>Call:</strong> +971 50 670 9963
        </p>
        <p className="text-sm mt-2 text-white">
          <strong>Email:</strong>{" "}
          <Link
            to="/"
            href="mailto:info@rentro.ae"
            className="text-white hover:underline"
          >
            info@rentro.ae
          </Link>
        </p>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div
    style={{ borderTop: "1px solid #ffffffb2" }}
    className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm pt-4 z-20"
  >
    <div className="flex  space-x-4 mt-2 md:mt-0">
    <p>We accept:</p>

      <SiVisa className="text-black text-2xl z-10 " />
      <FaCcMastercard className="text-black text-2xl z-10" />
    </div>
    <p className="mt-2 md:mt-0">© 2025 RENT RO, All rights reserved.</p>
  </div>

  {/* Waves Animation */}
  <div className="absolute bottom-0 left-0 w-full">
    <svg
      className="waves"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g className="parallax">
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="0"
          fill="rgba(255,255,255,0.7)"
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="3"
          fill="rgba(255,255,255,0.5)"
        />
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="5"
          fill="rgba(255,255,255,0.3)"
        />
        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
      </g>
    </svg>
  </div>
</footer>

  );
};

export default Footer;