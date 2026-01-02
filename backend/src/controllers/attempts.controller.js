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

const checkAttemps = asyncHandler(async (req, res) => {
  const { testId } = req.body;
  const attemptFind = await Attempts.findById(testId);
  if (!attemptFind) {
    throw new ApiError(404, "attemps not found");
  }
  if (attemptFind.tabSwitchCount > 2) {
    throw new ApiError(
      400,
      "test is terminated due to tab switching more than 2 times"
    );
  }
  if (attempt.testAttemptCount > 1) {
    throw new ApiError(
      400,
      "You are not allowed to take test more than one time"
    );
  }

  return res.status(200).json(new ApiResponse(200, "test attempt passed"));
});

export { attempt, checkAttemps };
