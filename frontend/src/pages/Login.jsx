import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "/src/assets/loginpage.webp";
import { useAuth } from "../context/AuthContext";
import { showError, showSuccess } from "../utils/toastService";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // show toast for 403 status 
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("message") === "blocked") {
    showError("Access Denied: Your account has been suspended by the administrator.");
  }
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const userData = await login({ email, password });

        if (userData && userData?.role === "user") {
          showSuccess(`Welcome back, ${userData.username}`);
        }
      } catch (err) {
        showError(err.message);
      }
    }
  };

  return (
    <div className="w-full min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-[url('/src/assets/audio_doodle_bg.png')] bg-cover bg-center lg:bg-none lg:bg-white relative">
      <div className="flex-1 flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-6 relative z-10 lg:h-full lg:overflow-y-auto">
        {/* Mobile: Glass Card. Desktop: Clean White */}
        <div className="w-full max-w-md mx-auto text-center lg:text-left flex flex-col justify-center bg-slate-50/5 opacity-90 lg:bg-transparent p-8 sm:p-10 lg:p-0 rounded-2xl shadow-lg lg:shadow-none border border-white/20 lg:border-none backdrop-blur-xl lg:backdrop-blur-none">
          <p
            id="logo-text"
            className="font-bold text-2xl sm:text-3xl tracking-tighter cursor-pointer mb-6 sm:mb-10 text-white lg:text-black"
          >
            DECIBEL.
          </p>

          <div className="mt-4 lg:mt-0">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white lg:text-gray-900 mb-4 sm:mb-6">
              Welcome Back, Homie
            </h2>
            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white/10 lg:bg-white border border-white/20 lg:border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white lg:focus:ring-black text-left text-white lg:text-black placeholder-gray-300 lg:placeholder-gray-500 backdrop-blur-sm lg:backdrop-blur-none"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/10 lg:bg-white border border-white/20 lg:border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white lg:focus:ring-black text-left text-white lg:text-black placeholder-gray-300 lg:placeholder-gray-500 backdrop-blur-sm lg:backdrop-blur-none"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white lg:bg-black text-black lg:text-white py-3 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-200 lg:hover:bg-gray-900 transition-all mt-2"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-gray-300 lg:text-gray-500 mt-6 lg:text-left">
              Don’t have an account?{" "}
              <Link to="/register" className="text-white lg:text-black hover:underline font-semibold lg:font-medium">
                Sign up
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

export default Login;
