import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useAuth } from "../context/AuthContext";
import clsx from "clsx";
import { IoMdLogOut } from "react-icons/io";
import { useWishlistCart } from "../context/WishlistCartContext";
import { useSearch } from "../context/SearchContext";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const { user, logOut } = useAuth();
  const { wishlist, cart } = useWishlistCart();

  // length of wishlist and cart
  const wishlistSize = wishlist.length;
  const cartSize = cart.length;

  // imported custom hook for navigation
  const { goHome, goProducts, goCart, goWishlist, goUser, goOrders, goLogin } =
    useAppNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  // hamburger menu
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // user toggle
  const toggleUser = () => {
    if (!user) {
      goLogin();
    }

    const dropBox = document.getElementById("drop");
    dropBox.classList.toggle("hidden");
  };

  // handleSearchSubmit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      goProducts();
    }
  };

  return (
    // desk nav
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full p-2 sm:p-4 lg:p-6">
        <div
          id="desk"
          className="hidden lg:flex w-[95%] mx-auto px-4 md:px-6 lg:px-8 py-3 rounded-2xl lg:rounded-3xl justify-between bg-white/50 border border-gray-200 items-center backdrop-blur-md shadow-sm gap-4"
        >
          <div id="logo-box" className="flex items-center flex-shrink-0">
            <p
              onClick={goHome}
              id="logo-text"
              className="font-bold text-xl md:text-2xl lg:text-3xl tracking-tighter cursor-pointer"
            >
              DECIBEL.
            </p>
          </div>

          <div
            id="search-box"
            className="flex-1 max-w-xs md:max-w-md lg:max-w-lg xl:w-[400px] bg-white rounded-4xl border border-gray-200 h-9 md:h-10 px-1"
          >
            <form
              className="flex items-center w-full h-full"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="w-11/12 rounded-4xl outline-0 px-3 md:px-6 text-sm md:text-base focus:outline-none focus:ring-0 focus:border-transparent"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="search"
                placeholder="Search products"
              />
              <button type="submit">
                <IoSearch className="p-1 md:p-1.5 w-7 h-7 md:w-8 md:h-8 text-sm rounded-full bg-black text-white cursor-pointer" />
              </button>
            </form>
          </div>

          <div id="menu-box" className="flex gap-3 md:gap-6 lg:gap-8 items-center flex-shrink-0">
            <div id="menu-box" className="flex gap-2 md:gap-3">
              <IoBagOutline
                className="w-7 h-7 md:w-8 md:h-8 p-1 rounded-full cursor-pointer"
                onClick={goProducts}
              />

              <div id="cart" className="relative">
                <span
                  className={
                    cartSize == 0
                      ? "hidden"
                      : "absolute right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-semibold"
                  }
                >
                  {cartSize}
                </span>
                <IoCartOutline
                  onClick={goCart}
                  className="w-7 h-7 md:w-8 md:h-8 p-1 rounded-full text-center cursor-pointer"
                />
              </div>

              <div id="cart" className="relative">
                <span
                  className={
                    wishlist == 0
                      ? "hidden"
                      : "absolute right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-semibold"
                  }
                >
                  {wishlistSize}
                </span>
                <IoMdHeartEmpty
                  onClick={goWishlist}
                  className="w-7 h-7 md:w-8 md:h-8 p-1 rounded-full text-center cursor-pointer"
                />
              </div>
            </div>
            <div
              onClick={toggleUser}
              id="user-box"
              className="relative flex gap-2 md:gap-3 bg-white px-2 md:px-4 py-1.5 md:py-2 rounded-4xl items-center cursor-pointer"
            >
              <p className="text-xs md:text-sm lg:text-base hidden md:block">{user ? user.username : "sign in"}</p>

              <div className="bg-gray-400 rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
                <p className="text-white font-medium text-sm md:text-lg">
                  {user ? user.username[0] : <FaRegUser />}
                </p>
              </div>

              {/* dropdown */}
              <div
                id="drop"
                className="hidden absolute w-[140%] md:w-[120%] bg-white top-14 -right-4 rounded-xl border border-gray-300 shadow-md z-50"
              >
                <ul className="w-full flex flex-col py-[1px]">
                  <li
                    onClick={() => goUser(user?._id)}
                    className="w-full flex px-3 items-center gap-6 h-10 font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <FaRegUser /> User
                  </li>

                  <li
                    className="w-full flex px-3 items-center gap-6 h-10 font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => goOrders(user._id)}
                  >
                    <BsBoxSeam /> Orders
                  </li>

                  <li
                    className="flex items-center px-3 gap-6 h-10 font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={goProducts}
                  >
                    <FiHeadphones /> Products
                  </li>

                  <div className="h-[1px] bg-gray-200 mt-4"></div>
                  <li
                    className="flex items-center px-3 gap-6 h-10 font-medium text-red-600 hover:bg-gray-100 cursor-pointer"
                    onClick={logOut}
                  >
                    <MdLogout /> Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Header - Single Line */}
        <div
          id="sm-nav"
          className="lg:hidden w-full mx-auto rounded-xl sm:rounded-2xl bg-white/50 border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-md shadow-sm"
        >
          {/* Single Line Header */}
          <div className="flex items-center justify-between gap-3">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <p 
                onClick={goHome}
                id="logo-text" 
                className="font-bold text-lg sm:text-xl tracking-tighter cursor-pointer whitespace-nowrap"
              >
                DECIBEL.
              </p>
            </div>

            {/* Search Bar - Center */}
            <div className="flex-1 min-w-0">
              <form
                className="flex items-center w-full bg-white rounded-full border border-gray-200 h-9 sm:h-10 px-2 sm:px-3"
                onSubmit={handleSearchSubmit}
              >
                <input
                  className="flex-1 rounded-full outline-0 px-2 sm:px-3 text-xs sm:text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name="search"
                  placeholder="Search..."
                />
                <button type="submit" className="flex-shrink-0">
                  <IoSearch className="p-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-white cursor-pointer" />
                </button>
              </form>
            </div>

            {/* Hamburger Menu - Right */}
            <div className="flex-shrink-0">
              <button
                onClick={handleMenu}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? (
                  <IoMdClose className="text-xl sm:text-2xl text-gray-700" />
                ) : (
                  <RxHamburgerMenu className="text-xl sm:text-2xl text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div
            id="menu"
            className={`w-full mt-3 pt-3 border-t border-gray-200 transition-all ease-in-out duration-300 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col gap-1">
              <li 
                onClick={() => { goProducts(); handleMenu(); }} 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <IoBagOutline className="text-lg text-gray-600" />
                <span className="text-sm sm:text-base font-medium text-gray-700">All Products</span>
              </li>
              
              <li 
                onClick={() => { goWishlist(); handleMenu(); }} 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative"
              >
                <IoMdHeartEmpty className="text-lg text-gray-600" />
                <span className="text-sm sm:text-base font-medium text-gray-700">Wishlist</span>
                {wishlistSize > 0 && (
                  <span className="ml-auto w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-semibold">
                    {wishlistSize}
                  </span>
                )}
              </li>
              
              <li 
                onClick={() => { goCart(); handleMenu(); }} 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative"
              >
                <IoCartOutline className="text-lg text-gray-600" />
                <span className="text-sm sm:text-base font-medium text-gray-700">Cart</span>
                {cartSize > 0 && (
                  <span className="ml-auto w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-semibold">
                    {cartSize}
                  </span>
                )}
              </li>

              {user ? (
                <>
                  <div className="h-[1px] bg-gray-200 my-2"></div>
                  
                  <li 
                    onClick={() => { goUser(user._id); handleMenu(); }} 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <FaRegUser className="text-lg text-gray-600" />
                    <span className="text-sm sm:text-base font-medium text-gray-700">Profile</span>
                  </li>
                  
                  <li 
                    onClick={() => { goOrders(user._id); handleMenu(); }} 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <BsBoxSeam className="text-lg text-gray-600" />
                    <span className="text-sm sm:text-base font-medium text-gray-700">Orders</span>
                  </li>
                  
                  <div className="h-[1px] bg-gray-200 my-2"></div>
                  
                  <li 
                    onClick={() => { logOut(); handleMenu(); }} 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <MdLogout className="text-lg text-red-600" />
                    <span className="text-sm sm:text-base font-medium text-red-600">Logout</span>
                  </li>
                </>
              ) : (
                <>
                  <div className="h-[1px] bg-gray-200 my-2"></div>
                  <li 
                    onClick={() => { goLogin(); handleMenu(); }} 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <FaRegUser className="text-lg text-gray-600" />
                    <span className="text-sm sm:text-base font-medium text-gray-700">Sign In</span>
                    <FaArrowRightLong className="ml-auto text-gray-400" />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
