import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  // read jwt from cookie (possible by cookie-parser)
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // set req.user with user find from db by avoiding the password
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized. Token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized. No token" });
  }
};
