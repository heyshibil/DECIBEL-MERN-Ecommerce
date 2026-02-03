import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://decibel:decibel123@cluster0.tqbbv.mongodb.net/decibelDB?appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected.");
  } catch (error) {
    console.error(error);
  }
};
