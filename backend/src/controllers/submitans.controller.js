import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Test } from "../models/test.model.js";
import { Attempts } from "../models/attempts.model.js";
import { User } from "../models/user.model.js";

const submitAns = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { testId, questionId } = req.params;
  const {} = req.body;

  //   i wanted to send all the answer at one go how to do that so i have to change in schema
  // check the result
  // mail system via job queue
});

export { submitAns };
