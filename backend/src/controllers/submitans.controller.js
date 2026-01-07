import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Test } from "../models/test.model.js";
import { Attempts } from "../models/attempts.model.js";
import SubmittedAnswer from "../models/submittedans.model.js";
import resultQueue from "../queue/result.queue.js";

const submitAns = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { testId } = req.params;
  const { answers, startedAt } = req.body;

  const test = await Test.findById(testId);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  if (!answers || answers.length === 0) {
    throw new ApiError(400, "Answers are required");
  }

  // check if the student submitted the answer already

  const alreadySubmitted = await SubmittedAnswer.findOne({
    userId,
    testId,
  });

  if (alreadySubmitted) {
    throw new ApiError(400, "Test already submitted");
  }

  const attempt = await Attempts.findOne({ userId, testId });

  if (attempt?.isDisqualified) {
    throw new ApiError(403, "You are disqualified from this test");
  }

  const submission = await SubmittedAnswer.create({
    userId,
    testId,
    answers,
    startedAt,
    endedAt: new Date(),
  });

  // result queue add
  await resultQueue.add(
    { userId, testId, submissionId: submission._id },
    {
      attempts: 3,
      backoff: 5000,
    }
  );

  attempt.testAttemptCount += 1;
  await attempt.save();

  return res
    .status(201)
    .json(new ApiResponse(201, submission, "Test submitted successfully"));
});

export { submitAns };
