import Router from "express";
import { attempt } from "../controllers/attempts.controller.js";
import { auth, authorization } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/attempt_test/:testId").post(auth, attempt);

export default router;
