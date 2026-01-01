import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Question } from "../models/question.model.js";
import { Test } from "../models/test.model.js";

const createQuestion = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const { question, options, answer, detailAnswer } = req.body;

  // validation
  if (
    !question ||
    !detailAnswer ||
    !Array.isArray(options) ||
    options.length < 2
  ) {
    throw new ApiError(
      400,
      "All fields are required and options must be valid"
    );
  }

  if (!options.includes(answer)) {
    throw new ApiError(400, "Answer must be one of the options");
  }

  // check test exists
  const existsTest = await Test.findById(testId);
  if (!existsTest) {
    throw new ApiError(404, "Test not found");
  }

  // create question
  const testQuestion = await Question.create({
    testId,
    question,
    options,
    answer,
    detailAnswer,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, testQuestion, "Question created successfully"));
});

export { createQuestion };
