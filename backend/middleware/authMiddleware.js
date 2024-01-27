import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../model/userModel.js";

// protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // READ JWT FROM THE COOKIE
  token = req.cookies.jwt;
  if (token) {
    try {
      // decode the token and get the userId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // find the user with decoded userId from the token
      res.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log('Not authorized, token failed');
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// admin middleware
const admin = (req, res, next) => {
  if (res.user && res.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, as admin");
  }
};

export { protect, admin };
