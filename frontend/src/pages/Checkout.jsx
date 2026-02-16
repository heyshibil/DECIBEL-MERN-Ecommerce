import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SubHead from "../components/SubHead";
import { FiArrowLeft } from "react-icons/fi";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useWishlistCart } from "../context/WishlistCartContext";
import { showError, showSuccess } from "../utils/toastService";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { user } = useAuth();

  // Form state for address and payment details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // load datas from localstorage
  useEffect(() => {
    const saved = localStorage.getItem(`addressOf${user._id}`);
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const { goCart, goPayment } = useAppNavigation();
  const { cart, subTotal, total, gst } = useWishlistCart();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(`addressOf${user._id}`, JSON.stringify(formData));
    goPayment();
  };

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } catch (error) {
      console.error("Error while saving field datas:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full lg:pt-24 pb-12 lg:pb-24 bg-gray-50">
      <Header />

      <div className="w-11/12 mx-auto pt-6 lg:pt-12">
        {/* Header Section */}
        <div className="w-full flex justify-between items-center mb-8">
          <div className="w-fit flex items-center gap-4">
            <FiArrowLeft
              size={30}
              className="cursor-pointer"
              onClick={goCart}
            />
            <h1 className="hh1 font-medium text-4xl">Checkout</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Address Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border-2 border-gray-200/70 p-6 lg:p-8">
              {/* Shipping Address Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Shipping Address
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Email and Phone Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Address Line 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Apartment 4B"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="India"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* City, State, Postal Code Row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Calicut"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Kerala"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="673672"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-6">
                    {/* <button
                        type="button"
                        className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                      >
                        Back to Cart
                      </button> */}
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border-2 border-gray-200/70 p-6 sticky top-24 max-h-fit">
              <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>

              {/* Cart Items */}
              {cart.map((item) => {
                return (
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    <div
                      key={item.product._id}
                      className="flex justify-between items-start gap-2"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800 truncate">
                          {item.product.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm whitespace-nowrap">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Divider */}
              <div className="h-[2px] w-full bg-gray-100 mb-6"></div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-semibold">₹{subTotal}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-green-600 font-semibold">Free</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">GST (18%)</p>
                  <p className="font-semibold">+ ₹{gst}</p>
                </div>

                {/* Total */}
                <div className="h-[2px] w-full bg-gray-100 my-3"></div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-2xl font-bold text-blue-600">₹{total}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">✓</span> Free shipping on all
                  orders
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-semibold">✓</span> Easy returns within 7
                  days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal - Hidden by default */}
        {/* <div className="hidden">
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
            <div className="bg-white rounded-xl p-8 max-w-md w-11/12 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-semibold mb-2">
                Order Placed Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your order has been confirmed. You'll receive an email shortly
                with your order details.
              </p>
              <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900">
                Continue Shopping
              </button>
            </div>
          </div>
        </div> */}

        {/* <div className="w-full mx-auto pt-12 lg:pt-24">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Checkout;
