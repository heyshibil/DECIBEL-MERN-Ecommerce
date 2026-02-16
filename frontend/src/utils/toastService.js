import { toast } from "react-toastify";

/**
 * Centralized toast service to ensure consistent toast notifications across the app
 * Uses react-toastify as the single source of truth
 */

const toastConfig = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
};

/**
 * Show success toast
 * @param {string} message - The message to display
 * @param {object} options - Optional additional toast options
 */
export const showSuccess = (message, options = {}) => {
  toast.success(message, { ...toastConfig, ...options });
};

/**
 * Show error toast
 * @param {string} message - The message to display
 * @param {object} options - Optional additional toast options
 */
export const showError = (message, options = {}) => {
  toast.error(message, { ...toastConfig, ...options });
};

/**
 * Show info toast
 * @param {string} message - The message to display
 * @param {object} options - Optional additional toast options
 */
export const showInfo = (message, options = {}) => {
  toast.info(message, { ...toastConfig, ...options });
};

/**
 * Show warning toast
 * @param {string} message - The message to display
 * @param {object} options - Optional additional toast options
 */
export const showWarning = (message, options = {}) => {
  toast.warning(message, { ...toastConfig, ...options });
};

/**
 * Show loading toast (promise-based)
 * @param {Promise} promise - The promise to track
 * @param {object} messages - Object with pending, success, and error messages
 * @param {object} options - Optional additional toast options
 */
export const showPromise = (promise, messages, options = {}) => {
  toast.promise(
    promise,
    {
      pending: messages.pending || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || "Error!",
    },
    { ...toastConfig, ...options }
  );
};

// Default export for convenience
export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
  warning: showWarning,
  promise: showPromise,
};
