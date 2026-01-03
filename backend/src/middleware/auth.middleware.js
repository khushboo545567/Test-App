import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }

  req.user = user;
  next();
});

const authorization = (role) =>
  asyncHandler(async (req, res, next) => {
    if (req.user.role !== role) {
      throw new ApiError(403, "Unauthorized access");
    }
    next();
  });

export { auth, authorization };
