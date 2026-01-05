import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
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

//////////////////////////
const checkAttempts = asyncHandler(async (req, res) => {
  const { testId } = req.body;
  const userId = req.user.id;

  // Find attempt for this user & test
  const attempt = await Attempts.findOne({ userId, testId });

  if (!attempt) {
    throw new ApiError(404, "Attempt record not found");
  }

  // Check tab switching rule
  if (attempt.tabSwitchCount > 2) {
    throw new ApiError(
      400,
      "Test is terminated due to tab switching more than 2 times"
    );
  }

  // Check attempt count rule
  if (attempt.testAttemptCount >= 1) {
    throw new ApiError(
      400,
      "You are not allowed to take the test more than once"
    );
  }

  // Check disqualification
  if (attempt.isDisqualified) {
    throw new ApiError(400, "You are disqualified from this test");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Test attempt allowed"));
});

const incrementTabSwitchCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { testId } = req.params;

  const attempt = await Attempts.findOne({ userId, testId });

  if (!attempt) {
    throw new ApiError(404, "Test attempt not found");
  }

  attempt.tabSwitchCount += 1;

  if (attempt.tabSwitchCount >= 2) {
    attempt.isDisqualified = true;
  }

  await attempt.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, attempt, "Tab switch count updated successfully")
    );
});

export { attempt, checkAttempts, incrementTabSwitchCount };
