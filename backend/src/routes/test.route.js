import { Router } from "express";
import { createTest, getTestForUser } from "../controllers/test.controller.js";
import { auth, authorization } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create_test").post(auth, authorization("admin"), createTest);

router.route("/get_test").get(auth, getTestForUser);

export default router;
