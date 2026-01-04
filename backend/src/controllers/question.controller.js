import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Question } from "../models/question.model.js";
import { Test } from "../models/test.model.js";
import SubmittedAnswer from "../models/submittedans.model.js";

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

// fetch the qes and ans for the user to analysis the result
const getQuesAns = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const userId = req.user._id;
  // Get questions
  const questions = await Question.find({ testId });

  if (!questions || questions.length === 0) {
    throw new ApiError(404, "No questions found for this test");
  }

  //  Get user's submitted answers (single document)
  const submission = await SubmittedAnswer.findOne({
    testId,
    userId,
  });
  console.log(submission);

  //  Create answer map
  const answerMap = {};

  if (submission) {
    submission.answers.forEach((ans) => {
      answerMap[ans.questionId.toString()] = ans;
    });
  }

  //  Merge question + user answer
  const response = questions.map((q) => {
    const userAns = answerMap[q._id.toString()];

    return {
      questionId: q._id,
      question: q.question,
      options: q.options,

      correctAnswer: submission ? q.answer : null,
      detailAnswer: submission ? q.detailAnswer : null,

      markedAnswer: userAns?.answer || null,
      score: userAns?.score || 0,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Questions fetched successfully"));
});

export { createQuestion, getQues, getQuesAns };
