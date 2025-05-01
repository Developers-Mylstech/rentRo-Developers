// import { useState, useEffect } from "react";
// import { FaShoppingCart, FaBars, FaMobileAlt, FaMoneyBillWaveAlt, FaWhatsapp } from "react-icons/fa";
// import { FiSearch, FiUser, FiX, FiLogOut } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import rentroLogo from "../../assets/renroLogo.png";
// import { useLocation } from "react-router-dom";
// import useAuthStore from "../../Context/AuthContext";

// const Header = () => {
//   const [scrolling, setScrolling] = useState(false);
//   const [searchVisible, setSearchVisible] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const location = useLocation();
//   const { user, isAuthenticated, logout, token, refresh } = useAuthStore();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolling(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setShowUserMenu(false);
//   };

//   return (
//     <header
//       className={`fixed left-0 right-0 z-50 w-full rounded-b-xl transition-all duration-500 ${
//         scrolling ? "bg-gradient-to-t from-blue-500 to-[#0e86bdcf] bg-opacity-80 shadow-md" : "bg-black bg-opacity-40"
//       } px-6 py-3`}
//     >
//       <div className="flex justify-between">
//         <div className="hidden md:flex justify-center items-center lg:gap-20 gap-5">
//           <div className="text-2xl font-bold text-red-600">
//             <Link to="/">
//               <img
//                 src={rentroLogo}
//                 alt="Logo"
//                 className="h-8 lg:h-12 w-auto object-contain"
//               />
//             </Link>
//           </div>

//           <nav className="flex justify-center items-center gap-4 lg:gap-5">
//             <ul className="flex space-x-4 lg:space-x-6">
//               {["rent", "sale", "services", 'career'].map((item) => (
//                 <li key={item} className="relative flex items-center justify-center cursor-pointer transition-all duration-300">
//                   <Link
//                     to={`/${item}`}
//                     className={`lg:text-sm md:text-[11px] font-semibold transition-all duration-300 bg-clip-text text-transparent ${
//                       scrolling ? "bg-white" : "bg-white"
//                     } hover:animate-[bg-scroll_2s_linear_infinite]`}
//                   >
//                     {item.toUpperCase()}
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             {/* Contact buttons */}
//             <button
//               onClick={() => window.open('tel:971506709963')}
//               className={`lg:text-sm md:text-[11px] text-gray-300 flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text ${
//                 scrolling ? "bg-white" : "bg-white"
//               } hover:animate-[bg-scroll_2s_linear_infinite]`}
//             >
//               <FaMobileAlt color="white" />
//               971 50 670 9963
//             </button>
//             <a
//               href={`https://wa.me/971506709963?text=Hello`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`lg:text-sm md:text-[11px] text-gray-300 flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text ${
//                 scrolling ? "bg-white" : "bg-white"
//               } hover:animate-[bg-scroll_2s_linear_infinite]`}
//             >
//               <FaWhatsapp color="white" />
//               971 50 670 9963
//             </a>
//           </nav>
//         </div>

//         {/* Icons & Search */}
//         <div className="flex items-center justify-between w-full md:w-fit gap-4">
//           <button
//             className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 transition-all"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <FaBars size={24} />
//           </button>

//           {/* Search Bar */}
//           <div className="relative flex items-center">
//             <div className={`flex items-center relative bg-transparent border rounded-full transition-all duration-500 overflow-hidden ${
//               searchVisible ? "w-36 md:w-64 py-1 pl-4 pr-8 opacity-100 scale-100" : "w-0 px-0 opacity-0 scale-95"
//             }`}>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="flex-grow w-full pr-8 py-1 bg-transparent placeholder:text-white text-white outline-none transition-all duration-200"
//               />
//               <FiX
//                 className="text-white text-xl cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 transition-transform duration-200 hover:rotate-90"
//                 onClick={() => setSearchVisible(false)}
//               />
//             </div>

//             {!searchVisible && (
//               <button
//                 className="bg-black bg-opacity-20 text-white p-2 rounded-full hover:bg-gray-300 transition-all duration-200"
//                 onClick={() => setSearchVisible(true)}
//               >
//                 <FiSearch className="text-xl text-white hover:text-gray-700" />
//               </button>
//             )}
//           </div>

//           {/* User Menu */}
//           <div className="relative hidden md:block">
//             {refresh ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="flex items-center gap-2 text-white hover:text-gray-300"
//                 >
//                   <FiUser className="text-xl" />
//                   <span className="text-sm">{user?.name || 'User'}</span>
//                 </button>
                
//                 {showUserMenu && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       onClick={() => setShowUserMenu(false)}
//                     >
//                       Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
//                     >
//                       <FiLogOut size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login">
//                 <FiUser className="text-xl cursor-pointer transition-transform ease-in-out duration-500 hover:scale-110 text-white" />
//               </Link>
//             )}
//           </div>

//           {/* Cart Button */}
//           <button className="text-[11px] flex items-center bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white px-6 py-3 rounded-full gap-2">
//             <FaShoppingCart />
//             AED 0.00
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`md:hidden block fixed top-0 left-0 w-full h-full bg-blue-950 text-white shadow-lg transform transition-transform duration-500 ${
//         menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
//       } flex flex-col items-center justify-start`}>
//         {isAuthenticated ? (
//           <div className="absolute top-4 left-4 flex items-center gap-2">
//             <FiUser className="text-2xl" />
//             <span>{user?.name || 'User'}</span>
//           </div>
//         ) : (
//           <Link to="/login">
//             <FiUser onClick={() => setMenuOpen(false)} className="absolute top-4 left-4 text-3xl cursor-pointer transition-transform duration-200 hover:scale-110 text-white" />
//           </Link>
//         )}
        
//         <button
//           className="absolute top-4 right-4 text-white text-3xl cursor-pointer transition-transform duration-500"
//           onClick={() => setMenuOpen(false)}
//         >
//           <FiX />
//         </button>

//         <nav className="w-full mt-[35%] text-center">
//           <ul className="text-lg font-semibold flex flex-col justify-normal items-center">
//             {["rent", "sale", "services"].map((item) => (
//               <li key={item} className="w-[80%]">
//                 <Link
//                   to={`/${item}`}
//                   className="block py-4 border-b border-gray-500 border-opacity-50 text-gray-300 hover:bg-blue-800 w-full transition"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {item.toUpperCase()}
//                 </Link>
//               </li>
//             ))}
            
//             {isAuthenticated && (
//               <li className="w-[80%]">
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMenuOpen(false);
//                   }}
//                   className="block py-4 border-b border-gray-500 border-opacity-50 text-red-400 hover:bg-blue-800 w-full transition flex items-center justify-center gap-2"
//                 >
//                   <FiLogOut />
//                   LOGOUT
//                 </button>
//               </li>
//             )}

//             <button
//               onClick={() => window.open('tel:971506709963')}
//               className="text-lg flex items-center gap-2 my-2 font-semibold transition-all duration-300 bg-clip-text text-transparent bg-white"
//             >
//               <FaMobileAlt color="white" />
//               971 50 670 9963
//             </button>
//             <button
//               onClick={() => window.open('tel:971506709963')}
//               className="text-lg flex items-center gap-2 my-2 font-semibold transition-all duration-300 bg-clip-text text-transparent bg-white"
//             >
//               <FaWhatsapp color="white" />
//               971 50 670 9963
//             </button>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;




import { useState, useEffect } from "react";
import { FaShoppingCart, FaBars, FaMobileAlt, FaWhatsapp } from "react-icons/fa";
import { FiSearch, FiUser, FiX, FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import rentroLogo from "../../assets/renroLogo.png";
import useAuthStore from "../../Context/AuthContext";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();
  const { user, isAuthenticated, logout, token } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 w-full rounded-b-xl transition-all duration-500 ${
        scrolling ? "bg-gradient-to-t from-blue-500 to-[#0e86bdcf] bg-opacity-80 shadow-md" : "bg-black bg-opacity-40"
      } px-6 py-3`}
    >
      <div className="flex justify-between items-center">
        <div className="hidden md:flex justify-center items-center lg:gap-20 gap-5">
          <div className="text-2xl font-bold text-red-600">
            <Link to="/">
              <img
                src={rentroLogo}
                alt="Logo"
                className="h-8 lg:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="flex justify-center items-center gap-4 lg:gap-5">
            <ul className="flex space-x-4 lg:space-x-6">
              {["rent", "sale", "services", 'career'].map((item) => (
                <li key={item} className="relative flex items-center justify-center cursor-pointer transition-all duration-300">
                  <Link
                    to={`/${item}`}
                    className={`lg:text-sm md:text-[11px] font-semibold transition-all duration-300 bg-clip-text text-transparent ${
                      scrolling ? "bg-white" : "bg-white"
                    } hover:animate-[bg-scroll_2s_linear_infinite]`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact buttons */}
            <button
              onClick={() => window.open('tel:971506709963')}
              className={`lg:text-sm md:text-[11px] text-gray-300 flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text ${
                scrolling ? "bg-white" : "bg-white"
              } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaMobileAlt color="white" />
              971 50 670 9963
            </button>
            <a
              href={`https://wa.me/971506709963?text=Hello`}
              target="_blank"
              rel="noopener noreferrer"
              className={`lg:text-sm md:text-[11px] text-gray-300 flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text ${
                scrolling ? "bg-white" : "bg-white"
              } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaWhatsapp color="white" />
              971 50 670 9963
            </a>
          </nav>
        </div>

        {/* Icons & Search */}
        <div className="flex items-center justify-between w-full md:w-fit gap-4">
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={24} />
          </button>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <div className={`flex items-center relative bg-transparent border rounded-full transition-all duration-500 overflow-hidden ${
              searchVisible ? "w-36 md:w-64 py-1 pl-4 pr-8 opacity-100 scale-100" : "w-0 px-0 opacity-0 scale-95"
            }`}>
              <input
                type="text"
                placeholder="Search"
                className="flex-grow w-full pr-8 py-1 bg-transparent placeholder:text-white text-white outline-none transition-all duration-200"
              />
              <FiX
                className="text-white text-xl cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 transition-transform duration-200 hover:rotate-90"
                onClick={() => setSearchVisible(false)}
              />
            </div>

            {!searchVisible && (
              <button
                className="bg-black bg-opacity-20 text-white p-2 rounded-full hover:bg-gray-300 transition-all duration-200"
                onClick={() => setSearchVisible(true)}
              >
                <FiSearch className="text-xl text-white hover:text-gray-700" />
              </button>
            )}
          </div>

          {/* User Menu */}
          <div className="relative hidden md:block">
            {token!=null ? (
              <div className="relative flex items-center gap-2">
                {/* User status indicator */}
                <div className="relative">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-white hover:text-gray-300 bg-blue-600 px-3 py-1 rounded-full"
                  >
                    <FiUser className="text-xl" />
                    <span className="text-sm">{user?.name || 'User'}</span>
                  </button>
                </div>
                
                {showUserMenu && (
                  <div className="absolute  top-2 right-0 mt-10 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                      Signed in as <span className="font-semibold">{user?.email}</span>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-1 text-white hover:text-blue-200 transition-colors"
              >
                <FiUser className="text-xl" />
                <span className="text-sm hidden md:inline">Sign In</span>
              </Link>
            )}
          </div>

          {/* Cart Button */}
          <button className="text-[11px] flex items-center bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white px-6 py-3 rounded-full gap-2 hover:shadow-lg transition-all">
            <FaShoppingCart />
            AED 0.00
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900 to-blue-950 text-white transform transition-all duration-300 ${
        menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } flex flex-col items-center justify-start pt-20`}>
        <button
          className="absolute top-6 right-6 text-white text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <FiX />
        </button>

        {isAuthenticated && (
          <div className="flex items-center gap-3 mb-8 px-6 py-3 bg-blue-800 rounded-full">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-800 animate-pulse"></div>
              <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                <FiUser className="text-xl" />
              </div>
            </div>
            <div>
              <div className="font-medium">{user?.name || 'User'}</div>
              <div className="text-xs text-blue-200">{user?.email}</div>
            </div>
          </div>
        )}

        <nav className="w-full px-6">
          <ul className="text-lg font-semibold flex flex-col">
            {["rent", "sale", "services"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="block py-4 border-b border-blue-800 text-blue-100 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.toUpperCase()}
                </Link>
              </li>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block py-4 border-b border-blue-800 text-blue-100 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  PROFILE
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block py-4 border-b border-blue-800 text-red-300 hover:text-red-100 transition flex items-center gap-2"
                >
                  <FiLogOut />
                  LOGOUT
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-4 border-b border-blue-800 text-blue-100 hover:text-white transition flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <FiUser />
                SIGN IN
              </Link>
            )}

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => window.open('tel:971506709963')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-800 rounded-full"
              >
                <FaMobileAlt />
                Call
              </button>
              <button
                onClick={() => window.open('https://wa.me/971506709963')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-full"
              >
                <FaWhatsapp />
                WhatsApp
              </button>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
