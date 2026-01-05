import transportor from "../config/mail.config";
import dotenv from "dotenv";
dotenv.config();

const sendResultMail = async (to, subject, html) => {
  await transportor.sendMail({
    from: `"Test App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendResultMail;
