import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.NODE_MAIL,
    pass: process.env.NODE_PASSWORD,
  },
});

const sendMail = async (to, sub, msg) => {
  try {
    const info = await transporter.sendMail({
      to,
      subject: sub,
      html: msg,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendMail;
