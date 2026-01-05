import resultQueue from "../queue/result.queue";
import SubmittedAnswer from "../models/submittedans.model.js";
import { Question } from "../models/question.model.js";

resultQueue.process(async (job) => {
  const { userId, testId } = job.data;

  console.log("Processing result for:", userId, testId);

  const submission = await SubmittedAnswer.findOne({ userId, testId });

  const questions = await Question.find({ testId });

  let totalScore = 0;

  submission.answers.forEach((ans) => {
    const question = questions.find(
      (q) => q._id.toString() === ans.questionId.toString()
    );

    if (question && question.answer === ans.answer) {
      ans.score = question.mark || 1;
      totalScore += ans.score;
    }
  });

  submission.totalScore = totalScore;
  await submission.save();

  //   call send mail function
});
