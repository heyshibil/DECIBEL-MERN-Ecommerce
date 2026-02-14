import express from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { limiter } from "../middlewares/rateLimiter.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", limiter, loginUser);
router.post("/logout", logoutUser);
router.patch("/profile", protect, updateUserProfile)

export default router;
