import React, { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import ManualDropdown from "./ManualDropdown";
import api from "../../services/api";
import { showError, showSuccess } from "../../utils/toastService";
import { useAdminStats } from "../context/AdminStatsContext";
import { toast } from "react-toastify";

// Helper function to resolve image path (handles both Cloudinary URLs and relative paths)
const getImagePath = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath; // Cloudinary URL
  return `/${imagePath}`; // Relative path
};

const AddProducts = ({ mode, onClose, setNewProduct, newProduct }) => {
  const { refreshStats } = useAdminStats();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // fetch for edit mode
  useEffect(() => {
    // set preview only for edit mode
    if (
      mode === "edit" &&
      newProduct.image &&
      typeof newProduct.image === "string"
    ) {
      setImagePreview(getImagePath(newProduct.image));
    }
  }, [newProduct.image, mode, imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    setNewProduct((prev) => ({ ...prev, image: file.name }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // handling rating value
    if (name === "rating") {
      let num = parseFloat(value);

      if (num > 5) num = 5;
      if (num < 0) num = 0;

      setNewProduct((prev) => ({ ...prev, [name]: num }));
      return;
    }

    setNewProduct((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const requiredFields = [
    "productName",
    "type",
    "price",
    "image",
    "status",
    "brand",
    "model",
    "rating",
    "description",
  ];

  const handleAddProduct = async () => {
    // missing field handling
    for (const field of requiredFields) {
      if (!newProduct[field] || newProduct[field].toString().trim() === "") {
        showError(`Please fill ${field} field`);
        return;
      }
    }

    try {
      const formData = new FormData();

      //  append all text fields
      formData.append("productName", newProduct.productName);
      formData.append("type", newProduct.type);
      formData.append("price", newProduct.price);
      formData.append("brand", newProduct.brand);
      formData.append("model", newProduct.model);
      formData.append("rating", newProduct.rating);
      formData.append("status", newProduct.status);
      formData.append("description", newProduct.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await api.post("/products", formData);

      if (response.status === 201 || response.status === 200) {
        refreshStats();
        showSuccess("Product added to Decibel inventory!");
        onClose(false);
      }
    } catch (error) {
      showError(error.response?.data?.message || "Upload failed");
      console.error("Failed to add products:", error);
    }
  };

  // update edited product
  const handleUpdateProduct = async () => {
    try {
      let payload;

      // if there is new image
      if (imageFile) {
        payload = new FormData();
        Object.keys(newProduct).forEach((key) => {
          // Don't set the old image string
          if (key !== "image") payload.append(key, newProduct[key]);
        });
        // set new image string
        payload.append("image", imageFile);
      }
      // No new image, send JSON
      else {
        payload = newProduct;
      }

      const response = await api.put(`/products/${newProduct._id}`, payload);
      if (response.status === 200) {
        refreshStats();
        showSuccess("Product updated successfully");
        onClose(false);
      }
    } catch (error) {
      showError("Failed to update product");
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-7 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Add New Product
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">Product Name</label>
          <input
            type="text"
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="product name"
            name="productName"
            onChange={handleChange}
            value={newProduct.productName}
          />
        </div>

        {/* sku */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">
            SKU{" "}
            {mode === "add" && (
              <span className="text-xs text-gray-400">(Auto-generated)</span>
            )}
          </label>
          <input
            type="text"
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed"
            placeholder="PROD-XXXX"
            name="sku"
            onChange={handleChange}
            value={newProduct.sku}
            disabled={mode === "add"}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">Price (₹)</label>
          <input
            type="number"
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="1999"
            name="price"
            onChange={handleChange}
            value={newProduct.price}
          />
        </div>

        {/* type */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1">Type</label>
            <ManualDropdown
              options={["Headphone", "TWS", "Speaker"]}
              selected={newProduct.type}
              onSelect={(value) =>
                handleChange({ target: { name: "type", value } })
              }
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1">Status</label>
            <ManualDropdown
              selected={newProduct.status}
              options={["Flagship", "Bestseller", "Budget"]}
              onSelect={(value) =>
                handleChange({ target: { name: "status", value } })
              }
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-2">Product Image</label>

          <label className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-pointer hover:bg-gray-100 transition">
            <div className="flex items-center gap-3">
              <FiUpload className="text-gray-500" size={18} />
              <span className="text-gray-400">
                {imageFile ? imageFile.name : "Upload Image"}
              </span>
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                className="w-10 h-10 rounded-lg object-cover border"
                alt="preview"
              />
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              name="image"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Brand */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            placeholder="Sony"
            onChange={handleChange}
            value={newProduct.brand}
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 
               focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>

        {/* Model */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">Model</label>
          <input
            type="text"
            name="model"
            placeholder="WF-1000XM5"
            onChange={handleChange}
            value={newProduct.model}
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 
               focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">Rating (0 - 5)</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            min="0"
            max="5"
            placeholder="4.3"
            onChange={handleChange}
            value={newProduct.rating}
            className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 
               focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Describe the sound quality, features, build, etc."
            rows={4}
            onChange={handleChange}
            value={newProduct.description}
            className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 
               focus:outline-none focus:ring-2 focus:ring-gray-700 resize-none"
          ></textarea>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-8 gap-3">
        {/* Cancel Button */}
        <button
          className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium shadow-sm 
               hover:bg-red-600 transition"
          onClick={() => onClose(false)}
        >
          Cancel
        </button>

        {/* Add Button */}
        {mode === "add" ? (
          <button
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium shadow-sm 
               hover:bg-indigo-700 transition"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        ) : (
          <button
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium shadow-sm 
               hover:bg-indigo-700 transition"
            onClick={handleUpdateProduct}
          >
            Edit Product
          </button>
        )}
      </div>
    </div>
  );
};

export default AddProducts;
