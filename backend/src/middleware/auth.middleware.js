import { ApiError } from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req, res, next) => {
  const token = req.cookie;
  if (!token) {
    throw new ApiError(409, "unauthorized access");
  }
  const decodedToken = jwt.verify(token);
  req.user = decodedToken;
  next();
});

const authorization = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user.role === "admin") {
    next();
  }
  throw new ApiError(400, "unauthorized access");
});

export { auth, authorization };
