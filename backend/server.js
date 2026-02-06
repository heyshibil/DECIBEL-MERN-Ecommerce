import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js"
import cors from "cors";
import cookieParser from "cookie-parser";


await connectDB();

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// product router
app.use("/api/products", productRoutes);

// user router
app.use("/api/users", userRoutes);

// wishlist router
app.use("/api/wishlist", wishlistRoutes)

app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`),
);
