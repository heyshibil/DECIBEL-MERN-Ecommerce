import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { showError, showSuccess } from "../utils/toastService";

const ResetPassword = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Resend timer countdown
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // OTP input handling
  const handleOtpChange = (element, index) => {
    if (!/^[0-9]*$/.test(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Resend OTP
  const handleResend = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/forgot-password", { email });
      showSuccess("A new reset code has been sent to your email.");
      setResendTimer(60);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      showError(errorMsg || "Failed to resend code. Try again later.");
    }
  };

  // Submit reset
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      showError("Please enter all 6 digits");
      return;
    }

    if (newPassword.length < 8) {
      showError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post("/users/reset-password", {
        email,
        otp: otpString,
        newPassword,
      });

      showSuccess(res.data.message);
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Reset failed. Please try again.";
      showError(errorMsg);

      // Clear OTP inputs on failure
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tighter text-black mb-2">
            DECIBEL.
          </h2>
          <h3 className="text-xl font-semibold text-gray-900 mt-6">
            Reset your password
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Enter the 6-digit code sent to <br />
            <span className="font-medium text-black">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 sm:gap-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-transparent"
              />
            ))}
          </div>

          {/* New Password */}
          <div className="space-y-3 text-left">
            <input
              type="password"
              placeholder="New password (min. 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || otp.join("").length !== 6}
            className={`w-full py-3.5 rounded-lg text-base font-semibold transition-all ${
              isSubmitting || otp.join("").length !== 6
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Resend */}
        <p className="text-sm text-gray-500 mt-8">
          Didn't receive the code?{" "}
          <button
            disabled={resendTimer > 0}
            className="text-black font-semibold hover:underline focus:outline-none"
            onClick={handleResend}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
