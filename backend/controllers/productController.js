import { Product } from "../models/Product.js";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Invalid product id" });
  }
};

// CREATE product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError")
      return res.status(400).json({ message: error.message });

    return res.status(500).json({ message: "Failed to create product" });
  }
};
