import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Test } from "../models/test.model.js";
import { Attempts } from "../models/attempts.model.js";
import { User } from "../models/user.model.js";

const attempt = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { testId } = req.params;
  const existTest = await Test.findById(testId);
  if (!existTest) {
    throw new ApiError(404, "the test does not exists ");
  }
  const existUser = await User.findById(userId);
  if (!existUser) {
    throw new ApiError(404, "user does not found !");
  }
  // prevent multiple attempts
  const existingAttempt = await Attempts.findOne({ userId, testId });
  if (existingAttempt) {
    throw new ApiError(400, "Test already attempted");
  }
  const attemptCreate = await Attempts.create({
    userId,
    testId,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, attemptCreate, "attempt model started"));
});

export { attempt };
