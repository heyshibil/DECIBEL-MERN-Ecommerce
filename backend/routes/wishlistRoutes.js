import express from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getWishlist).post(toggleWishlist);

export default router;
