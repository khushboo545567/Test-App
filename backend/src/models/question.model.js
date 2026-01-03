import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    detailAnswer: {
      type: String,
      required: true,
    },
    mark: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
