import nodemailer from "nodemailer";
import 'dotenv/config';

const emailUsername = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;

const sendEmail = options => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: emailUsername,
            pass: emailPassword,
        },
    });
};