import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authroute from "./routes/auth.routes.js";
import testroute from "./routes/test.route.js";
import quesRoute from "./routes/question.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors configuration
app.use(
  cors({
    origin: "",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/auth/user", authroute);
app.use("/api/v1/test/admin", testroute);
app.use("/api/v1/question/admin", quesRoute);

export default app;
