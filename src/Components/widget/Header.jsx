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
      className={`fixed  left-0 right-0 z-50 w-full rounded-b-xl transition-all duration-500 ${scrolling ? "bg-gradient-to-t from-blue-500 to-[#0e86bdcf] bg-opacity-80 shadow-md" : "bg-black bg-opacity-40"
        } px-6 py-3`}
    >
      <div className="flex justify-between  ">
        <div className=" hidden md:flex justify-center items-center lg:gap-20  gap-5">

          <div className="text-2xl font-bold text-red-600">
            <Link to="/">
              <img
                src={rentroLogo}
                alt="Logo"
                className="h-8 lg:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="flex justify-center items-center gap-4 lg:gap-5 ">
            <ul className="flex space-x-4 lg:space-x-6">
              {["rent", "sale", "services"].map((item) => (
                <li
                  key={item}
                  className="relative flex items-center justify-center cursor-pointer transition-all duration-300"
                >
                  <Link
                    to={`/${item}`}
                    className={`lg:text-sm md:text-[11px] font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling ? "bg-white" : "bg-white"
                      } hover:animate-[bg-scroll_2s_linear_infinite]`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>


            <button

              onClick={() => window.open('tel:971506709963')}
              className={`lg:text-sm md:text-[11px]  text-gray-300 flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text  ${scrolling
                ? "bg-white"
                // : "bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#00d2ff] bg-[200%]"
                : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaMobileAlt color="white" />
              971 50 670 9963
            </button>
            <a
              href={`https://wa.me/971506709963?text=Hello`}
              target="_blank"
              rel="noopener noreferrer"
              className={`lg:text-sm md:text-[11px] text-gray-300 flex items-center gap-2 font-semibold transition-all duration-300 bg-clip-text ${scrolling ? "bg-white" : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaWhatsapp color="white" />
              971 50 670 9963
            </a>

          </nav>
        </div>

        {/* Icons & Search */}
        <div className="flex items-center justify-between  w-full md:w-fit gap-4 ">
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-gray-700 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={24} />
          </button>

          <div className="relative flex items-center ">
            <div
              className={`flex items-center relative bg-transparent border rounded-full transition-all duration-500 overflow-hidden ${searchVisible ? "w-36 md:w-64 py-1 pl-4 pr-8 opacity-100 scale-100" : "w-0 px-0 opacity-0 scale-95"
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

            {!searchVisible && (
              <button
                className="bg-black bg-opacity-20 text-white p-2 rounded-full  hover:bg-gray-300 transition-all duration-200"
                onClick={() => setSearchVisible(true)}
              >
                <FiSearch className="text-xl text-white hover:text-gray-700" />
              </button>
            )}

          </div>
          <Link className="hidden md:block" to="/login">
            <FiUser className="text-xl cursor-pointer transition-transform ease-in-out duration-500 hover:scale-110 text-white" />
          </Link>
          <button className="text-[11px] flex items-center bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white px-6 py-3 rounded-full gap-2">
            <FaShoppingCart />
            AED 0.00
          </button>

        </div>
      </div>

      <div
        className={`md:hidden block fixed top-0 left-0 w-full h-full bg-blue-950 text-white shadow-lg transform transition-transform duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } flex flex-col items-center justify-start`}
      >
        <Link to="/login">
          <FiUser onClick={() => setMenuOpen(false)} className="absolute top-4 left-4 text-3xl cursor-pointer transition-transform duration-200 hover:scale-110 text-white" />
        </Link>
        <button className="absolute top-4 right-4 text-white text-3xl  cursor-pointer transition-transform duration-500" onClick={() => setMenuOpen(false)}>
          <FiX />
        </button>


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
            <button
              onClick={() => window.open('tel:971506709963')}
              className={`text-lg flex items-center gap-2 my-2 font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling
                ? "bg-white"
                : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaMobileAlt color="white" />
              971 50 670 9963
            </button>
            <button
              onClick={() => window.open('tel:971506709963')}
              className={`text-lg flex items-center gap-2 my-2 font-semibold transition-all duration-300 bg-clip-text text-transparent ${scrolling
                ? "bg-white"
                : "bg-white"
                } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaWhatsapp color="white" />
              971 50 670 9963
            </button>

          </ul>
        </nav>

        {/* Cart Button */}

      </div>
    </header>
  );
};

export default Header;
