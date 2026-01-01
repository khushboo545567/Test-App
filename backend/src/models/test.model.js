import mongoose from "mongoose";

const testSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    durationInMinutes: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Test = mongoose.model("Test", testSchema);
