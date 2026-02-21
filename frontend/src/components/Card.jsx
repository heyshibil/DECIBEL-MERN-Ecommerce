import { FiHeart } from "react-icons/fi";
import { showError } from "../utils/toastService";
import { useAuth } from "../context/AuthContext";
import { useWishlistCart } from "../context/WishlistCartContext";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Card = (product) => {
  const { _id, productName, type, price, img } = product;
  const { goDetails } = useAppNavigation();
  const { user } = useAuth();
  const { wishlist, handleToggleWishlist, cart, handleAddToCart } = useWishlistCart();
  
  const isWishlisted = wishlist?.some((item) => item?._id?.toString() === _id?.toString());
  const isCart = cart.some((item) => item?._id?.toString() === _id?.toString());

  // cart actions
  const toggleCart = async (e) => {
    e.stopPropagation();

    if (!user) return showError("Please login first");
    await handleAddToCart(_id);
  };

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!user) return showError("Please login first");
    await handleToggleWishlist(product);
  };

  return (
    <div className="relative flex flex-col gap-4 sm:gap-6 lg:gap-8 rounded-xl sm:rounded-2xl p-3 sm:p-4 min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] items-start shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <div id="upper" className="w-full rounded-xl h-[200px] sm:h-[240px] lg:h-auto overflow-hidden bg-gray-50">
        <img
          className="w-full h-full object-cover object-center rounded-lg sm:rounded-xl cursor-pointer"
          src={img}
          alt=""
          onClick={() => goDetails(_id)}
        />
      </div>
      <div id="lower" className="w-full flex items-start flex-col gap-1">
        <p id="pname" className="text-base sm:text-lg font-semibold line-clamp-2">
          {productName}
        </p>
        <div className="mt-3 sm:mt-4 w-full flex flex-row justify-between items-center gap-3">
          <p className="text-lg sm:text-xl font-bold text-blue-500">₹{price}</p>
          <button
            onClick={toggleCart}
            className="bg-yellow-300 w-fit px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 rounded-3xl sm:rounded-4xl text-sm sm:text-base font-semibold transition-all duration-300 ease-out hover:bg-yellow-300/80"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <span
        onClick={toggleWishlist}
        className="absolute right-6 sm:right-6 lg:right-8 top-6 sm:top-6 lg:top-8 rounded-full p-1.5 sm:p-2 bg-white/70 cursor-pointer"
      >
        <FiHeart
          className={
            isWishlisted
              ? "text-base sm:text-lg fill-red-500 text-red-500"
              : "text-base sm:text-lg text-gray-500"
          }
        />
      </span>
    </div>
  );
};

export default Card;
