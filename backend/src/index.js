import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
