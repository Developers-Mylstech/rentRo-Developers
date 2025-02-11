import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import rentroLogo from "../assets/renroLogo.png";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-40 w-[100%]   rounded-b-xl transition-all duration-500 ${
        scrolling ? "bg-blue-900 shadow-md" : "bg-black bg-opacity-40"
      } px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-red-600">
          <Link to="/">
            <img
              src={rentroLogo}
              alt="Logo"
              className="h-12 w-auto object-cover"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-6 flex-grow justify-center">
          <ul className="flex space-x-6">
            <li  className="relative flex items-center justify-center cursor-pointer transition-all duration-300">
              <Link to="/rent" className={`text-gray-700 text-lg font-semibold transition-all duration-300 bg-clip-text text-transparent ${ scrolling ?"bg-white":"bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"}  hover:animate-[bg-scroll_2s_linear_infinite]`}>
                RENT
              </Link>
            </li>
            <li className="relative flex items-center justify-center cursor-pointer transition-all duration-300">
              <Link to="/sale" className={`text-gray-700 text-lg font-semibold transition-all duration-300 bg-clip-text text-transparent ${ scrolling ?"bg-white":"bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"}  hover:animate-[bg-scroll_2s_linear_infinite]`}>
                SALE
              </Link>
            </li>
            <li className="relative flex items-center justify-center cursor-pointer transition-all duration-300">
              <Link to="/services" className={`text-gray-700 text-lg font-semibold transition-all duration-300 bg-clip-text text-transparent ${ scrolling ?"bg-white":"bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"}  hover:animate-[bg-scroll_2s_linear_infinite]`}>
                SERVICES
              </Link>
            </li>
          </ul>
        </div>

        {/* Icons & Search */}
        <div className="flex items-center gap-4">
          {/* Search Section */}
          <div className="relative flex items-center">
            <div
              className={` flex items-center bg-white  border rounded-full transition-all duration-500 overflow-hidden ${
                searchVisible
                  ? "w-64 px-3 py-1 opacity-100 scale-100"
                  : "w-0 px-0 opacity-0 scale-95"
              }`}
            >
              <input
                type="text"
                placeholder="Search"
                className="flex-grow px-2 py-1  outline-none text-gray-700 transition-all duration-300"
              />
              <FiX
                className="text-gray-500 text-xl cursor-pointer hover:text-black transition-transform duration-200 hover:rotate-90"
                onClick={() => setSearchVisible(false)}
              />
            </div>

            {/* Toggle Search Button */}
            {!searchVisible && (
              <button
                className="bg-black bg-opacity-20 text-white hover:text p-2 rounded-full hover:bg-gray-300 transition-all duration-300"
                onClick={() => setSearchVisible(true)}
              >
                <FiSearch className="text-xl text-white hover:text-gray-700" />
              </button>
            )}
          </div>

          {/* User and Cart Icons */}
          <Link to="/login" ><FiUser className="text-xl cursor-pointer transition-transform duration-200 hover:scale-110 text-[#196bdd]" /></Link>
          <button className="flex items-center bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white px-4 py-2 rounded-full gap-2">
            <FaShoppingCart />
            AED 0.00
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
