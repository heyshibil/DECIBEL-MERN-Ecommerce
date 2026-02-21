import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "/src/assets/loginpage.webp";
import { useAuth } from "../context/AuthContext";
import { showError, showSuccess } from "../utils/toastService";

const Register = () => {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await register({ username, email, password, confirmPassword });
      if (userData) {
        showSuccess(`Login successful! Welcome, ${userData.username}`);
      }
    } catch (error) {
      console.error(error);
      showError("Failed to register. Please try again");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-6">
        <div className="max-w-md mx-auto text-left flex flex-col h-full justify-center">
          <p
            id="logo-text"
            className="font-bold text-2xl sm:text-3xl tracking-tighter cursor-pointer mb-6 sm:mb-10"
          >
            DECIBEL.
          </p>

          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Sign Up
            </h2>
            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-900 transition-all"
              >
                Sign up
              </button>
            </form>

            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2">
        <img className="w-full h-full object-cover" src={LoginImage} alt="" />
      </div>
    </div>
  );
};

export default Register;
