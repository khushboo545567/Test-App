import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Question } from "../models/question.model.js";
import { Test } from "../models/test.model.js";
import { Attempts } from "../models/attempts.model.js";
import { submitAns } from "./submitans.controller.js";

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

const getQues = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  // 1. Check if test exists
  const existTest = await Test.findById(testId);
  if (!existTest) {
    throw new ApiError(404, "Test not found");
  }

  // 2. Fetch questions
  const questions = await Question.find({ testId });

  // 3. Check if questions exist
  if (questions.length === 0) {
    throw new ApiError(404, "Questions for this test are not created yet");
  }

  // 4. Send response
  return res
    .status(200)
    .json(new ApiResponse(200, questions, "Questions fetched successfully"));
});

// get the ques and ans for the user
const getQuesAns = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  const questions = await Question.find({ testId });
  const ansMarked = await submitAns.findById(testId);
  const responseObj = {
    question: questions.question,
    options: questions.options,
    answer: questions.answer,
    detailAnswer: questions.detailAnswer,
    markedAns: ansMarked.answer,
    score: ansMarked.score,
    startedAt: ansMarked.startedAt,
    endAt: ansMarked.endAt,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, responseObj, "get you ques and ans "));
});

export { createQuestion, getQues, getQuesAns };
