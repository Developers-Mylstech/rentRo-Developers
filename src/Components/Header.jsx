import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch, FiUser } from "react-icons/fi";

const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header className="bg-gray-200 h-20">
      <div className="container mx-auto px-6 py-2 flex items-center "> {/* Removed justify-between */}
        {/* Logo Section - Pushed to the left */}
        <div className="flex-grow"> {/* Takes up available space */}
          <h1 className="text-2xl font-bold text-red-600">
            RENT<span className="text-black">R₂O</span>
          </h1>
        </div>

        {/* Mobile Hamburger Button (unchanged) */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
          aria-label="Toggle navigation"
          type="button"
          aria-expanded="false"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="block w-5 h-0.5 bg-gray-500 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-500 mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-500"></span>
        </button>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden lg:flex space-x-4 justify-center flex-grow"> {/* Added justify-center and flex-grow */}
          <ul className="flex space-x-6">
            <li>
              <a className="text-gray-700 hover:text-blue-600" href="#">RENT</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-blue-600" href="#">SALE</a>
            </li>
            <li className="relative">
              <a
                className="text-gray-700 hover:text-blue-600"
                href="#"
                role="button"
                aria-expanded="false"
              >
                SERVICES
              </a>
            </li>
          </ul>
        </div>

        {/* Contact and Icons Section - Right Aligned */}
        <div className="flex items-center gap-4">
          <span className="text-black font-semibold hidden md:inline">
            +971 50 670 9963
          </span>
          <a href="#" className="text-black font-semibold hidden md:inline">
            CAREERS
          </a>

          <div className="flex items-center space-x-2">
            <form
              className={`flex space-x-2 items-center transition-all duration-300 ${
                searchVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
              }`}
            >
              <input
                className="px-3 py-1 border rounded-md text-gray-700 w-48 transition-width duration-300"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                type="submit"
              >
                Search
              </button>
            </form>

            <FiSearch
              className={`text-xl cursor-pointer transition-opacity duration-300 ${
                searchVisible ? "opacity-0" : "opacity-100"
              }`}
              onClick={toggleSearch}
            />
          </div>

          <FiUser className="text-xl cursor-pointer" />

          <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md gap-2">
            <FaShoppingCart />
            AED 0.00
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;