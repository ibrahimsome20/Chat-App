import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Mailtrap live sending SMTP transport.
// Host/port/credentials come from the Mailtrap "Sending Domains" -> SMTP settings.
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT || 587),
  // 465 = implicit TLS, otherwise STARTTLS on 587/2525
  secure: Number(process.env.MAILTRAP_PORT) === 465,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const SUBJECTS = {
  verify: "Verify your email",
  reset: "Reset your password",
};

const buildHtml = (code, type) => {
  const heading =
    type === "reset" ? "Password reset code" : "Email verification code";
  const intro =
    type === "reset"
      ? "Use the code below to reset your password."
      : "Use the code below to verify your email address.";

  return `
  <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #eee;border-radius:8px">
    <h2 style="margin:0 0 8px">${heading}</h2>
    <p style="color:#555">${intro}</p>
    <div style="font-size:32px;font-weight:bold;letter-spacing:8px;text-align:center;padding:16px;background:#f5f5f5;border-radius:8px;margin:16px 0">
      ${code}
    </div>
    <p style="color:#888;font-size:13px">This code expires in 10 minutes. If you didn't request it, you can ignore this email.</p>
  </div>`;
};

/**
 * Send a one-time-password email.
 * @param {string} to recipient email
 * @param {string} code 6-digit OTP
 * @param {"verify"|"reset"} type purpose of the OTP
 */
export const sendOtpEmail = async (to, code, type) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: SUBJECTS[type] || "Your verification code",
    html: buildHtml(code, type),
    text: `Your code is ${code}. It expires in 10 minutes.`,
  });
};

export default transporter;
