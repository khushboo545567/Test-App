import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Test } from "../models/test.model.js";

const createTest = asyncHandler(async (req, res) => {
  const { title, description, durationInMinutes } = req.body;
  if (!title || !description || durationInMinutes <= 0) {
    throw new ApiError(400, "all creadientials are required");
  }

  const existTitle = await Test.findOne({ title });
  if (existTitle) {
    throw new ApiError(400, "can not create the test with this  title");
  }

  const test = new Test.create({
    title,
    description,
    durationInMinutes,
  });

  await test.save();
  return res
    .status(201)
    .json(new ApiResponse(201, test, "test created successfully !"));
});

export { createTest };
