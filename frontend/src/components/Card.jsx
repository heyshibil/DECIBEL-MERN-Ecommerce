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
    <div className="relative flex flex-col gap-8 rounded-2xl p-4 min-h-[400px] items-start shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <div id="upper" className="w-full rounded-2xl">
        <img
          className="w-full max-h-72 h-full object-cover rounded-xl cursor-pointer"
          src={img}
          alt=""
          onClick={() => goDetails(_id)}
        />
      </div>
      <div id="lower" className="w-full flex items-start flex-col gap-1">
        <p id="pname" className="text-lg font-semibold">
          {productName}
        </p>
        <div className="mt-4 w-full flex justify-between items-center">
          <p className="text-xl font-bold text-blue-500">₹{price}</p>
          <button
            onClick={toggleCart}
            className="bg-yellow-300 w-fit px-8 py-2 rounded-4xl font-semibold transition-all duration-300 ease-out hover:bg-yellow-300/80"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <span
        onClick={toggleWishlist}
        className="absolute right-8 top-8 rounded-full p-2 bg-white/70 cursor-pointer"
      >
        <FiHeart
          className={
            isWishlisted
              ? "text-lg fill-red-500 text-red-500"
              : "text-lg text-gray-500"
          }
        />
      </span>
    </div>
  );
};

export default Card;
