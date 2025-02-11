import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch, FiUser } from "react-icons/fi";

const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLoginSignupToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <header className="bg-sky-200 h-20">
      <div className="container mx-auto px-6 py-2 flex items-center">
        {/* Logo Section - Replaced Text with Image */}
        <div className="flex-grow">
          <img src="./public/rentro.png" alt="Rentr2o Logo" className="h-12" />
        </div>

        {/* Mobile Hamburger Button */}
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

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-4 justify-center flex-grow">
          <ul className="flex space-x-6">
            <li>
              <a className="text-gray-700 hover:text-blue-600" href="#">RENT</a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-blue-600" href="#">SALE</a>
            </li>
            <li className="relative">
              <a className="text-gray-700 hover:text-blue-600" href="#">SERVICES</a>
            </li>
          </ul>
        </div>

        {/* Contact and Icons Section */}
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
                className="px-4 py-2 text-white bg-sky-600 rounded-md hover:bg-sky-900"
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

          {/* User Icon */}
          <FiUser className="text-xl cursor-pointer" onClick={toggleModal} />

          {/* Cart Button */}
          <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md gap-2">
            <FaShoppingCart />
            AED 0.00
          </button>
        </div>
      </div>

      {/* Login/Signup Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  {isSignup ? "Sign Up" : "Login"}
                </button>
                <button
                  type="button"
                  onClick={handleLoginSignupToggle}
                  className="text-sm text-blue-600"
                >
                  {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
            <button
              type="button"
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-500"
            >
              X
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
