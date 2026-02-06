import { User } from "../models/User.js";

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    // check user wishlist
    const isWishlist = user.wishlist.includes(productId);

    if (isWishlist) {
      user.wishlist.pull(productId);
      await user.save();

      return res
        .status(200)
        .json({ message: "Removed from wishlist", wishlist: user.wishlist });
    } else {
      user.wishlist.push(productId);
      await user.save();

      return res
        .status(200)
        .json({ message: "Added to wishlist", wishlist: user.wishlist });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
