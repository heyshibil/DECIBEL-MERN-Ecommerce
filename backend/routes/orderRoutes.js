import express from "express";
import { createOrder, getAllOrders, getOrders } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all", getAllOrders);
router.get("/", protect, getOrders)
router.post("/", protect, createOrder);

export default router;
