import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa6";
import { FiGlobe, FiHeart } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { mirage } from "ldrs";
import { useAuth } from "../context/AuthContext";
import { useWishlistCart } from "../context/WishlistCartContext";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { showError } from "../utils/toastService";
import { getImagePath } from "../utils/getImage";
mirage.register();

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading: productLoading } = useProducts();
  const product = products.find((item) => item._id === id);

  const { user, loading: authLoading } = useAuth();
  const { goCart } = useAppNavigation();
  const {
    cart,
    wishlist,
    handleToggleWishlist,
    handleAddToCart,
    loading: wishlistCartLoading,
  } = useWishlistCart();

  const isCart = cart.some((item) => item?._id === product?._id);
  const isWishlisted = wishlist.some((item) => item?._id === product?._id);

  if (wishlistCartLoading || authLoading || productLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <l-mirage size="60" speed="2.5" color="black"></l-mirage>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-3xl semibold">Product Not Found</p>
      </div>
    );
  }

  const statusColors = {
    Flagship: "bg-purple-500",
    Budget: "bg-blue-500",
    Bestseller: "bg-green-500",
  };

  // wishlist actions
  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!user) return showError("Please login first");
    await handleToggleWishlist(product);
  };

  // cart actions
  const toggleCart = async (productId) => {
    if (isCart) return showError("Item already added to cart");
    else {
      await handleAddToCart(productId);
      goCart();
    }
  };

  return (
    <div className="relative min-h-screen w-full lg:pt-24 pb-12 lg:pb-24">
      <Header />
      <div className="w-11/12 mx-auto pt-6 lg:pt-12">
        <div className="w-full flex justify-between">
          <div id="left" className="w-1/2 flex items-center">
            <div
              id="productImg-box"
              className="w-3/4 lg:h-[550px] bg-gray-200 rounded flex items-center justify-center"
            >
              {product.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={getImagePath(product?.image)}
                  alt={product.productName}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML =
                      '<div class="text-center"><p class="text-gray-500 text-lg font-medium">Image Not Available</p></div>';
                  }}
                />
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 text-lg font-medium">
                    Image Not Available
                  </p>
                </div>
              )}
            </div>
          </div>

          <div id="right" className="w-1/2 flex flex-col justify-between">
            <span
              className={`hh1 font-medium text-white px-3 py-1 rounded-full w-fit mb-4 ${
                statusColors[product.status] || "bg-gray-500"
              }`}
            >
              {product.status}
            </span>

            <div id="product" className="flex flex-col">
              <h4 className="hh1 text-2xl font-medium">{product.brand}</h4>
              <h2 className="text-5xl font-semibold text-gray-600">
                {product.model}
              </h2>
              <p className="flex items-center gap-2 font-medium mt-4">
                <FaStar className="fill-yellow-400 text" />
                {product.rating}
              </p>
            </div>

            <div id="description-box" className="mt-8">
              <p className="text-gray-500">{product.description}</p>
            </div>

            <div id="cash-box" className="mt-8">
              <p className="text-4xl font-bold">₹{product.price}/-</p>
            </div>

            <div id="button-box" className="flex gap-4 lg:mt-10 items-center">
              <div className="p-1 rounded-full">
                <FiHeart
                  onClick={toggleWishlist}
                  className={
                    isWishlisted
                      ? "w-8 h-8 p-1 text-lg fill-red-500 text-red-500 cursor-pointer"
                      : "w-8 h-8 p-1 text-gray-500 rounded-full text-lg cursor-pointer"
                  }
                />
              </div>

              <button
                className="flex  items-center gap-3 min-w-40 justify-center py-2 bg-yellow-300 rounded-4xl font-semibold  hover:bg-yellow-300/90"
                onClick={() => toggleCart(product._id)}
              >
                Add to Cart <FaCartShopping />
              </button>
            </div>

            <div id="guarantee-card" className="lg:mt-10 flex justify-between">
              <p className="flex items-center gap-3 text-lg text-gray-500 font-medium">
                <FiGlobe className="text-2xl text-gray-500" /> All India Free
                Delivery
              </p>

              <p className="flex items-center gap-3 text-lg text-gray-500 font-medium">
                <FaShieldAlt className="text-2xl text-gray-500" /> 3 Year
                Warranty
              </p>

              <p className="flex items-center gap-3 text-lg text-gray-500 font-medium">
                <MdWorkspacePremium className="text-2xl text-gray-500" />
                100% Authentic
              </p>
            </div>
          </div>
        </div>

        {/* <div className="w-full mx-auto pt-12 lg:pt-24">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;
