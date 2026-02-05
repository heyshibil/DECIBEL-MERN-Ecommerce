import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User exists, Please login" });
    }

    // newUser instance
    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();

    // JWT token and HTTPOnly cookie generation
    generateToken(res, savedUser._id);

    // registration successful
    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
        wishlist: savedUser.wishlist,
        cart: savedUser.cart,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    // user && comparing password with matchPassword method (model)
    if (user && (await user.matchPassword(password))) {
      if (user.isBlocked) {
        return res.status(403).json({
          message: "Your access has been restricted. Please contact support",
        });
      }

      // JWT token and HTTPOnly cookie generation
      generateToken(res, user._id);

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          wishlist: user.wishlist,
          cart: user.cart,
        },
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later" });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  }); 

  res.status(200).json({ message: "Logged out successfully" });
};
