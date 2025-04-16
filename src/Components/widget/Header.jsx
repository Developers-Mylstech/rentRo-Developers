import { useState, useEffect } from "react";
import { FaShoppingCart, FaBars, FaMobileAlt, FaMoneyBillWaveAlt, FaWhatsapp } from "react-icons/fa";
import { FiSearch, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import rentroLogo from "../../assets/renroLogo.png";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLoginSignupToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 w-full rounded-b-xl transition-all duration-500 ${scrolling ? "bg-gradient-to-t from-blue-500 to-[#0e86bdcf] bg-opacity-80 shadow-md" : "bg-black bg-opacity-40"
        } px-6 py-3`}
    >
      <div className="flex justify-between  ">
        <div className=" hidden md:flex justify-center items-center gap-28">

          <div className="text-2xl font-bold text-red-600">
            <Link to="/">
              <img src={rentroLogo} alt="Logo" className="h-6 md:h-12 w-auto object-cover" />
            </Link>
          </div>

          <nav className="flex justify-center items-center gap-5 ">
            <ul className="flex space-x-6">
              {["rent", "sale", "services",].map((item) => (
                <li key={item} className="relative flex items-center justify-center cursor-pointer transition-all duration-300">
                  <Link
                    to={`/${item}`}
                    className={`text-lg font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling
                      ? "bg-white"
                      // : "bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"
                      : "bg-white"
                      } hover:animate-[bg-scroll_2s_linear_infinite]`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
            <Link

              className={`text-lg flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling
                ? "bg-white"
                // : "bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"
                : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaMobileAlt color="white" />
              +971 50 670 9963
            </Link>
            <Link

              className={`text-lg flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling
                ? "bg-white"
                // : "bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"
                : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaWhatsapp color="white" />
              +971 50 670 9963
            </Link>


          </nav>
        </div>

        {/* Icons & Search */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex items-center">
          <div
  className={`flex items-center relative bg-transparent border rounded-full transition-all duration-500 overflow-hidden ${
    searchVisible ? "w-36 md:w-64 py-1 pl-4 pr-8 opacity-100 scale-100" : "w-0 px-0 opacity-0 scale-95"
  }`}
>
  <input
    type="text"
    placeholder="Search"
    className="flex-grow w-full pr-8 py-1 bg-transparent placeholder:text-white text-white outline-none  transition-all duration-200 "
  />
  <FiX
    className="text-white text-xl cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2  transition-transform duration-200 hover:rotate-90"
    onClick={() => setSearchVisible(false)}
  />
</div>


            {/* Search Button */}
            {!searchVisible && (
              <button
                className="bg-black bg-opacity-20 text-white p-2 rounded-full  hover:bg-gray-300 transition-all duration-200"
                onClick={() => setSearchVisible(true)}
              >
                <FiSearch className="text-xl text-white hover:text-gray-700" />
              </button>
            )}
          </div>

          {/* User & Cart Icons */}
          <Link className="hidden md:block" to="/login">
            <FiUser className="text-xl cursor-pointer transition-transform ease-in-out duration-500 hover:scale-110 text-white" />
          </Link>
          <button className="hidden md:flex items-center bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white px-4 py-2 rounded-full gap-2">
            <FaShoppingCart />
            AED 0.00
          </button>

          {/* Hamburger Menu - Mobile */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 transition-all"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden block fixed top-0 left-0 w-full h-full bg-blue-950 text-white shadow-lg transform transition-transform duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } flex flex-col items-center justify-start`}
      >
        <Link to="/login">
          <FiUser onClick={() => setMenuOpen(false)} className="absolute top-4 left-4 text-3xl cursor-pointer transition-transform duration-200 hover:scale-110 text-white" />
        </Link>
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white text-3xl  cursor-pointer transition-transform duration-500" onClick={() => setMenuOpen(false)}>
          <FiX />
        </button>

        {/* Mobile Links */}
        <nav className=" w-full mt-[35%]  text-center">
          <ul className=" text-lg font-semibold flex flex-col justify-normal items-center">
            {["rent", "sale", "services"].map((item) => (
              <li key={item} className="w-[80%]">
                <Link
                  to={`/${item}`}
                  className="block py-4 border-b border-gray-500 border-opacity-50 text-gray-300 hover:bg-blue-800 w-full transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.toUpperCase()}
                </Link>
              </li>
            ))}
            <Link

              className={`text-lg flex items-center gap-2 my-2 font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling
                ? "bg-white"
                // : "bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"
                : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaMobileAlt color="white" />
              971 50 670 9963
            </Link>
            <Link

              className={`text-lg flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling
                ? "bg-white"
                // : "bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"
                : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaWhatsapp color="white" />
              971 50 670 9963
            </Link>

          </ul>
        </nav>

        {/* Cart Button */}
        <button className="mt-16 flex items-center bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white px-6 py-3 rounded-full gap-2">
          <FaShoppingCart />
          AED 0.00
        </button>
      </div>
    </header>
  );
};

export default Header;
