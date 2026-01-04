import Router from "express";
import { createQuestion } from "../controllers/question.controller.js";
import { auth, authorization } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/add_question/:testId")
  .post(auth, authorization("admin"), createQuestion);

export default router;
