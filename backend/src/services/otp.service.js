import crypto from "crypto";
import bcrypt from "bcrypt";
import Otp from "../models/otp.model.js";
import { sendOtpEmail } from "../config/mailer.js";

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

const generateCode = () => crypto.randomInt(100000, 1000000).toString(); // 6 digits

/**
 * Generate a fresh OTP for (email, type), email it, and store its hash.
 * Any previous OTP of the same type for this email is removed first.
 */
export const createAndSendOtp = async (email, type) => {
  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);

  await Otp.deleteMany({ email, type });
  await Otp.create({
    email,
    codeHash,
    type,
    expiresAt: new Date(Date.now() + OTP_TTL_MS),
  });

  await sendOtpEmail(email, code, type);
};

/**
 * Verify a submitted code for (email, type).
 * @returns {Promise<{ ok: boolean, reason?: string }>}
 */
export const verifyOtp = async (email, code, type) => {
  const record = await Otp.findOne({ email, type }).sort({ createdAt: -1 });

  if (!record || record.expiresAt < new Date()) {
    return { ok: false, reason: "Code is invalid or has expired" };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await Otp.deleteOne({ _id: record._id });
    return { ok: false, reason: "Too many attempts, request a new code" };
  }

  const isMatch = await bcrypt.compare(code, record.codeHash);
  if (!isMatch) {
    record.attempts += 1;
    await record.save();
    return { ok: false, reason: "Code is invalid or has expired" };
  }

  // consume the OTP on success
  await Otp.deleteOne({ _id: record._id });
  return { ok: true };
};
