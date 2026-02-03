import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors'

await connectDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// product route
app.use("/api/products", productRoutes);

app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`),
);
