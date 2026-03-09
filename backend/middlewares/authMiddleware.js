import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  // read jwt from cookie (possible by cookie-parser)
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res
          .status(401)
          .json({ message: "User no longer exists. Access denied." });
      }

      if (user.isBlocked) {
        // make tokens expire
        res.cookie("accessToken", "", {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: new Date(0),
        });
        res.cookie("refreshToken", "", {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: new Date(0),
        });

        return res.status(403).json({
          message: "Your access has been suspended. Please contact support",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: "Not authorized. Token failed or expired" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized. No token" });
  }
};
