import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { showError, showSuccess } from "../utils/toastService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showError("Please enter your email address");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post("/users/forgot-password", { email });
      showSuccess(res.data.message);

      // Navigate to reset page with email in state
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      showError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
        <p className="font-bold text-2xl sm:text-3xl tracking-tighter cursor-pointer mb-6 text-black">
          DECIBEL.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Enter your email address and we'll send you a verification code to
          reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black text-left placeholder-gray-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${
              isSubmitting
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              "Send Reset Code"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
