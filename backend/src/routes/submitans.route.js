import Router from "express";
import { auth } from "../middleware/auth.middleware.js";
import { submitAns } from "../controllers/submitans.controller.js";

const router = Router();

router.route("/submit_ans/:testId").post(auth, submitAns);

export default router;
