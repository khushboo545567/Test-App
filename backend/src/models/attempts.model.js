import mongoose from "mongoose";

const attemptSchema = mongoose.Schema(
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
    tabSwitchCount: {
      type: Number,
      default: 0,
    },
    testAttemptCount: {
      type: Number,
      default: 1,
    },
    isDisqualified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Attempts = mongoose.model("Attempts", attemptSchema);
