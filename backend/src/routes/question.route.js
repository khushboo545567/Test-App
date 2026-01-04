import Router from "express";
import {
  createQuestion,
  getQues,
  getQuesAns,
} from "../controllers/question.controller.js";
import { auth, authorization } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/add_question/:testId")
  .post(auth, authorization("admin"), createQuestion);

router.route("/get_question/:testId").get(auth, getQues);

router.route("/get_ques_ans/:testId").get(auth, getQuesAns);

export default router;
