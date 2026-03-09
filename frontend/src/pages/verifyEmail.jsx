import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastService";
import { useAuth } from "../context/AuthContext";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // resend timer
  const [resendTimer, setResendTimer] = useState(60);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, resendOtpRequest } = useAuth();

  // Extract the email passed from the Register component
  const email = location.state?.email;

  // If they somehow navigate here without registering, send them back
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // 60min timer for resend
  useEffect(() => {
    let interval;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // handle setOtp & focus
  const handleChange = (element, index) => {
    if (!/^[0-9]*$/.test(element.value)) return; // Only allow numbers and remove spaces

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // handle focus (backspace)
  const handleKeyDown = (e, index) => {
    // Auto-focus previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      setIsResending(true);
      await resendOtpRequest(email);
    } finally {
      setIsResending(false);
      // Reset timer
      setResendTimer(60);
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      showError("Please enter all 6 digits");
      return;
    }

    try {
      setIsVerifying(true);
      // verifying otp
      await verifyOtp(email, otpString);
    } catch (error) {
      const errorMesage = error.response?.data?.message;
      console.error("Verify error:", error);
      showError(errorMesage || "Verification failed. Please try again.");

      // Clear the inputs on failure for better UX
      setOtp(new Array(6).fill(""));
      inputRefs.current[0].focus();
    } finally {
      setIsVerifying(false);
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
            Verify your email
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            We've sent a 6-digit code to <br />
            <span className="font-medium text-black">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-2 sm:gap-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-transparent"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying || otp.join("").length !== 6}
            className={`w-full py-3.5 rounded-lg text-base font-semibold transition-all ${
              isVerifying || otp.join("").length !== 6
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isVerifying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                Verifying...
              </span>
            ) : (
              "Verify Account"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-8">
          Didn't receive the code?{" "}
          <button
            disabled={resendTimer > 0 || isResending}
            className="text-black font-semibold hover:underline focus:outline-none disabled:opacity-50"
            onClick={handleResend}
          >
            {isResending ? (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : resendTimer > 0 ? (
              `Resend in ${resendTimer}s`
            ) : (
              "Resend"
            )}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
