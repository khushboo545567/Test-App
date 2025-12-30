import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running ${port}`);
    });
  })
  .catch((error) => {
    console.log("error while server is running ", error);
  });
