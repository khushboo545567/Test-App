import mongoose from "mongoose";

const submittedAnswerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalScore: {
      type: Number,
      default: 0,
    },
    startedAt: {
      type: Date,
      required: true,
    },
    endedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const SubmittedAnswer = mongoose.model(
  "SubmittedAnswer",
  submittedAnswerSchema
);

export default SubmittedAnswer;
