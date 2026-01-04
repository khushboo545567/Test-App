import { Router } from "express";
import { createTest } from "../controllers/test.controller.js";
import { auth, authorization } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create_test").post(auth, authorization("admin"), createTest);

export default router;
