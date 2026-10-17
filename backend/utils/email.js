import nodemailer from "nodemailer";
import 'dotenv/config';

const emailUsername = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;

// Gmail needs an App Password here (Google Account > Security > App passwords), not the account password
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: emailUsername,
        pass: emailPassword,
    },
});

const sendEmail = async ({ to, subject, text, html }) => {
    await transporter.sendMail({
        from: `Dewy <${emailUsername}>`,
        to,
        subject,
        text,
        html,
    });
};

export const sendPasswordResetCode = async (emailAddress, firstName, resetCode) => {
    await sendEmail({
        to: emailAddress,
        subject: "Your Dewy password reset code",
        text: `Hi ${firstName},\n\nYour Dewy password reset code is: ${resetCode}\n\nIt expires in 10 minutes. If you didn't ask to reset your password, you can ignore this email.\n\nThe Dewy Team`,
        html: `
            <div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1f2933;">
                <h2 style="color: #2C6E72; margin: 0 0 16px;">Reset your password</h2>
                <p>Hi ${firstName},</p>
                <p>Use this code in the Dewy app to reset your password:</p>
                <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2C6E72; margin: 24px 0;">${resetCode}</p>
                <p style="color: #6b7280;">It expires in 10 minutes. If you didn't ask to reset your password, you can ignore this email.</p>
                <p style="color: #6b7280;">The Dewy Team</p>
            </div>
        `,
    });
};

export default sendEmail;
