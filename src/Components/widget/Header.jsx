import { useState, useEffect } from "react";
import { FaShoppingCart, FaBars, FaMobileAlt, FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { FiSearch, FiUser, FiX, FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import rentroLogo from "../../assets/renroLogo.png";
import useAuthStore from "../../Context/AuthContext";
import useCartStore from "../../Context/CartContext";
import CartSidebar from "./CartSidebar"
import useUserStore from "../../Context/UserContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCartButton, setShowCartButton] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { userDetails, fetchUser } = useUserStore();
  const [products , setProducts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, token } = useAuthStore();
  const { totalItems, totalAmount, fetchCartItems } = useCartStore();


  const storedItems = localStorage.getItem('cartItemsOffline')
  const parsedItems = JSON.parse(storedItems);
  const totalItemsOffline = parsedItems?.length || 0;
  const totalAmountOffline = parsedItems?.reduce((total, item) => total + item.price, 0) || 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchCartItems().catch(error => console.error("Failed to fetch cart items:", error));
   
  }, [fetchCartItems]);
  useEffect(() => {
    fetchUser();
  }, [ fetchUser]);

  useEffect(() => {
    if (searchVisible) {
      setShowCartButton(false);
    } else {

      const timer = setTimeout(() => {
        setShowCartButton(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchVisible]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };



  const handleInputSearch = async (input) => {
  // Validate brand object exists
  

  try {
    console.log(input,' has been searched');
    // Encode the brand name for URL safet  
  
     navigate(`/search/${input}`,{state:{products}}, );
     setInputValue('');


    
  } catch (error) {
    console.error("Error handling brand navigation:", error);
   alert("Failed to navigate to brand page");
  }
};

  return (
    <header
      className={`fixed left-0 right-0 z-50 w-full rounded-b-xl shadow-md transition-all duration-500 ${
        scrolling ? "bg-gradient-to-t from-blue-400 to-[#34b2eccf] bg-opacity-80 shadow-md" : "bg-white "
      } px-6 py-3`}
    >
      <div className="flex justify-between items-center">
        <div className="hidden md:flex justify-center items-center lg:gap-10 gap-2">
          <div className="text-2xl font-bold text-red-600">
            <Link to="/">
              <img
                src={rentroLogo}
                alt="Logo"
                className="h-8 lg:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="flex justify-center items-center gap-4 lg:gap-4">
            <ul className="flex space-x-4 lg:space-x-6">
              {["rent", "sell", "services", "career"].map((item) => (
                <li key={item} className="relative flex items-center justify-center cursor-pointer transition-all duration-300">
                  <Link
                    to={`/${item}`}
                    className={`lg:text-sm md:text-[11px] font-semibold transition-all duration-300 bg-clip-text  ${
                      scrolling ? "text-blue-800" : "text-blue-800"
                    } hover:animate-[bg-scroll_2s_linear_infinite]`}
                  >
                    {item.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={() => window.open('tel:971506709963')}
              className={`md:text-base flex items-center gap-1 font-semibold transition-all duration-300 bg-clip-text  ${
                scrolling ? " text-blue-800" : "text-blue-800"
              } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaMobileAlt />
              <span className="hidden lg:inline">971 50 670 9963</span>
            </button>
            <a
              href={`https://wa.me/971506709963?text=Hello`}
              target="_blank"
              rel="noopener noreferrer"
              className={`lg:text-base flex items-center gap-1 font-semibold transition-all duration-300 bg-clip-text ${
                scrolling ? " text-blue-800" : "text-blue-800"
              } hover:animate-[bg-scroll_2s_linear_infinite]`}
            >
              <FaWhatsapp />
              <span className="hidden lg:inline">971 50 670 9963</span>
            </a>
          </nav>
        </div>

        <div className="flex items-center justify-between w-full md:w-fit gap-4">
          <button
            className="md:hidden p-2 rounded-md text-blue-800 hover:bg-gray-700 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={24} />
          </button>

          <div className="flex items-center md:gap-4 gap-1">
            <div className="relative flex items-center">
              <div className={`flex items-center relative  border ${scrolling? " border-white bg-transparent": " border-blue-200 bg-blue-50 "}   rounded-full transition-all duration-300 overflow-hidden ${
                searchVisible ? "w-full md:w-96   py-1 pl-4 pr-8 opacity-100" : "w-0 px-0 opacity-0 "
              }` }>
                <input
                  type="text"
                  placeholder="Search"
                  value={inputValue}
                  onChange={ (e) => setInputValue(e.target.value) }
              
                  className={`flex-grow w-full pr-8 py-1 bg-transparent ${scrolling?"placeholder:text-white":"placeholder:text-blue-200"}  text-blue-800 outline-none transition-all ease-in-out duration-100`}
                />

                <FiSearch onClick={()=>handleInputSearch(inputValue)} className={`text-gray-300 text-xl ${scrolling?"text-white":"text-blue-200"} cursor-pointer `} />
                <FiX
                  className={`text-gray-300 text-xl ${scrolling?"text-white":"text-blue-200"} cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 transition-transform duration-200`}
                  onClick={() => setSearchVisible(false)}
                />
              </div>

              {!searchVisible && (
                <button
                  className={`${scrolling?"bg-black bg-opacity-20 text-white":"bg-blue-100 text-blue-800"} p-2 rounded-full  transition-all duration-200`}
                  onClick={() => setSearchVisible(true)}
                >
                  <FiSearch className="text-xl  " />
                </button>
              )}
            </div>

            <div className="relative block">
              {token!=null ? (
                <div className="relative flex items-center gap-2">
                  {showCartButton && (
                    <div className="hidden md:block relative transition-opacity duration-300">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 text-white hover:text-gray-300 bg-blue-600 px-3 py-2 rounded-full"
                      >
                        <FiUser className="text-xl" />
                        <span className="text-sm">Hi👋🏻 <span className="hidden md:inline">{userDetails?.name?.split(" ")[0]|| 'User'}</span></span>
                      </button>
                    </div>
                  )}
                  
                  {showUserMenu && (
                    <div className="absolute top-2 right-0 mt-10 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {/* <div className="px-4 py-2 text-xs text-gray-500 border-b">
                        Signed in as <span className="font-semibold">{userDetails?.email}</span>
                      </div> */}
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
                  className={`hidden md:flex ${scrolling?"text-white":"text-blue-800"} items-center gap-1  transition-colors`}
                >
                  <FiUser className="text-xl" />
                </Link>
              )}
            </div>

            {showCartButton && (
              <button 
                onClick={toggleCart}
                className="text-[10px] md:text-xs flex items-center bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white md:px-2 px-2 py-2 md:rounded-full rounded-md gap-1 border border-white hover:shadow-lg transform transition-all duration-300 opacity-0 animate-fadeIn"
              >
                <FaShoppingCart className="text-base" />
                {token!=null && <span>AED {totalAmount.toFixed(2)}</span>}
                <span className="!absolute !right-0 !top-0 !w-4 !h-4 !bg-white !rounded-full !flex !items-center !justify-center !text-xs !font-bold !text-gray-600 !transform !translate-x-1/2 !-translate-y-1/2 border border-blue-500">
                  { token? totalItems: totalItemsOffline}
                </span>
              </button>
            )}
          </div>
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

        <nav className="w-full px-6">
          <ul className="text-lg font-semibold flex flex-col">
            {["rent", "sell", "services", "career"].map((item) => (
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
            
            {token!=null ? (
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

      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
    </header>
  );
};

export default Header;