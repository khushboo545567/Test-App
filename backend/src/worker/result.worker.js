import resultQueue from "../queue/result.queue";
import SubmittedAnswer from "../models/submittedans.model.js";
import { Question } from "../models/question.model.js";
import sendResultMail from "../utils/mail.js";
import { User } from "../models/user.model.js";

resultQueue.process(async (job) => {
  const { userId, testId } = job.data;

  console.log("Processing result for:", userId, testId);
  const user = await User.findById(userId);
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

  await sendResultMail(
    user.email,
    "Your Test Result",
    `<h3>Hello ${user.userName}</h3>
     <p>Your test is evaluated.</p>
     <p><b>Score:</b> ${totalScore}</p>`
  );
});
