import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transportor = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transportor;
