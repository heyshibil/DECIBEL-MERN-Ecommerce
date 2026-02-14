import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goProducts = () => navigate("/products");
  const goWishlist = () => navigate("/wishlist");
  const goCart = () => navigate("/cart");
  const goDetails = (_id) => navigate(`/product/${_id}`);
  const goUser = (_id) => navigate(`/user/${_id}`);
  const goCheckout = () => navigate(`/checkout`);
  const goOrders = (orderId) => navigate(`/orders/${orderId}`);
  const goPayment = () => navigate(`/payment/razorpay`);
  const goLogin = () => navigate("/login");
  const goRegister = () => navigate("/register");

  // admin navigation
  const goAdminDashboard  = () => navigate("/admin/dashboard");

  return {
    goHome,
    goProducts,
    goWishlist,
    goCart,
    goDetails,
    goUser,
    goCheckout,
    goOrders,
    goPayment,
    goLogin,
    goRegister,
    goAdminDashboard
  };
};
