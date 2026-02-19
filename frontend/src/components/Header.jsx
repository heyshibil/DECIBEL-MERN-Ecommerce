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
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
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
      <div className="w-full p-4 lg:p-6">
        <div
          id="desk"
          className="hidden lg:flex w-[95%] mx-auto px-8 py-3 rounded-3xl justify-between bg-white/50 border border-gray-200 items-center backdrop-blur-md shadow-sm"
        >
          <div id="logo-box" className="flex items-center">
            <p
              onClick={goHome}
              id="logo-text"
              className="font-bold text-3xl tracking-tighter cursor-pointer"
            >
              DECIBEL.
            </p>
          </div>

          <div
            id="search-box"
            className="w-[400px] bg-white rounded-4xl border border-gray-200 h-10 px-1"
          >
            <form
              className="flex items-center w-full h-full"
              onSubmit={handleSearchSubmit}
            >
              <input
                className="w-11/12 rounded-4xl outline-0 px-6 focus:outline-none focus:ring-0 focus:border-transparent"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="search"
                placeholder="Search products"
              />
              <button type="submit">
                <IoSearch className="p-1.5 w-8 text-sm h-8 rounded-full bg-black text-white cursor-pointer" />
              </button>
            </form>
          </div>

          <div id="menu-box" className="flex gap-8 items-center">
            <div id="menu-box" className="flex gap-3">
              <IoBagOutline
                className="w-8 h-8 p-1 rounded-full cursor-pointer"
                onClick={goProducts}
              />

              <div id="cart" className="relative">
                <span
                  className={
                    cartSize == 0
                      ? "hidden"
                      : "absolute right-0 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-semibold"
                  }
                >
                  {cartSize}
                </span>
                <IoCartOutline
                  onClick={goCart}
                  className="w-8 h-8 p-1 rounded-full text-center cursor-pointer"
                />
              </div>

              <div id="cart" className="relative">
                <span
                  className={
                    wishlist == 0
                      ? "hidden"
                      : "absolute right-0 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-semibold"
                  }
                >
                  {wishlistSize}
                </span>
                <IoMdHeartEmpty
                  onClick={goWishlist}
                  className="w-8 h-8 p-1 rounded-full text-center cursor-pointer"
                />
              </div>
            </div>
            <div
              onClick={toggleUser}
              id="user-box"
              className="relative flex gap-3 bg-white px-4 py-2 rounded-4xl items-center cursor-pointer"
            >
              <p>{user ? user.username : "sign in"}</p>

              <div className="bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center">
                <p className="text-white font-medium text-lg">
                  {user ? user.username[0] : <FaRegUser />}
                </p>
              </div>

              {/* dropdown */}
              <div
                id="drop"
                className="hidden absolute w-[120%] bg-white top-14 -right-4 rounded-xl border border-gray-300 shadow-md"
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

        {/* sm devices */}
        <div
          id="sm-nav"
          className="lg:hidden w-11/12 mx-auto rounded-2xl flex flex-col bg-white/50 border border-gray-200 px-4 py-2 gap-3 backdrop-blur-md"
        >
          <div
            id="logo-box"
            className="w-full flex items-center justify-between"
          >
            <p id="logo-text" className="font-bold text-2xl tracking-tighter">
              DECIBEL.
            </p>
            {menuOpen ? (
              <IoMdClose onClick={handleMenu} className="text-xl" />
            ) : (
              <RxHamburgerMenu onClick={handleMenu} className="text-xl" />
            )}
          </div>
          <div
            id="menu"
            className="hidden w-full transition-all ease-in-out duration-700"
          >
            <div className="w-full h-[1px] bg-gray-300"></div>
            <ul className="flex flex-col items-end pt-3 pr-3 gap-2">
              <li className="">
                <p className="text-xl font-medium">All products</p>
              </li>
              <li className="">
                <p className="text-xl font-medium">Wishlist</p>
              </li>
              <li className="">
                <p className="text-xl font-medium">Cart</p>
              </li>
              <li className="flex items-center gap-3 pt-3">
                <p className="text-xl font-medium">Login</p>
                <FaArrowRightLong />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
