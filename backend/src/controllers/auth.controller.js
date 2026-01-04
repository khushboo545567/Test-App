import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER USER
const register = asyncHandler(async (req, res) => {
  const { userName, email, password, rollNo } = req.body;

  //  validation
  if (!userName || !email || !password || !rollNo) {
    throw new ApiError(400, "All credentials are required");
  }

  //  email exists check
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new ApiError(409, "User already exists with this email");
  }

  //  roll no exists check
  const rollNoExist = await User.findOne({ rollNo });
  if (rollNoExist) {
    throw new ApiError(409, "User already exists with this roll number");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user (NO role passed)
  const user = await User.create({
    userName,
    email,
    rollNo,
    password: hashedPassword,
  });

  // send response with backend-assigned role
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        userName: user.userName,
        email: user.email,
        rollNo: user.rollNo,
        role: user.role, // default = student
      },
      "Student registered successfully"
    )
  );
});

// LOGIN USER
const login = asyncHandler(async (req, res) => {
  const { rollNo, password } = req.body;
  if (!rollNo || !password) {
    throw new ApiError(400, "All credentials are required");
  }
  const isUserExists = await User.findOne({ rollNo });

  if (!isUserExists) {
    throw new ApiError(404, "user does not exists");
  }
  // check if the password is correct or not
  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExists.password
  );
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }
  // generate token
  const token = jwt.sign(
    {
      id: isUserExists._id,
      role: isUserExists.role,
      userName: isUserExists.userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const options = { httpOnly: true, secure: true };
  const user = {
    id: isUserExists._id,
    user_name: isUserExists.userName,
    role: isUserExists.role,
    accessToken: token,
  };
  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, user, "logged in successfully !"));
});

export { register, login };
