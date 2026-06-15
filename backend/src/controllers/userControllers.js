import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.modules.js";
import { createAndSendOtp, verifyOtp } from "../services/otp.service.js";

/* ================= SIGN UP ================= */
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // send the email-verification OTP
    await createAndSendOtp(email, "verify");

    res.status(201).json({
      message: "User created. Check your email for a verification code.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= VERIFY EMAIL ================= */
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await verifyOtp(email, code, "verify");
    if (!result.ok) {
      return res.status(400).json({ message: result.reason });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= RESEND OTP ================= */
export const resendOtp = async (req, res) => {
  try {
    const { email, type } = req.body;

    const user = await User.findOne({ email });
    // Always respond the same way so we don't leak which emails exist.
    if (user && !(type === "verify" && user.isVerified)) {
      await createAndSendOtp(email, type);
    }

    res.status(200).json({ message: "If the account exists, a code has been sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      await createAndSendOtp(email, "reset");
    }

    // Don't reveal whether the email is registered.
    res.status(200).json({ message: "If the account exists, a reset code has been sent." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const result = await verifyOtp(email, code, "reset");
    if (!result.ok) {
      return res.status(400).json({ message: result.reason });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
        return res.status(403).json({
            message: "Please verify your email before logging in",
            needsVerification: true,
        });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGOUT ================= */
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

/* ================= auth ================= */
export const getMe=async(req,res)=>{
const {userId}=req

  try {
    if(!userId){
      return res.status(401).json({message:'unAuthorized'})
    }

    const user=await User.findById(userId)
    res.json({user})
  } catch (error) {
    return res.status(501).json({message:error.message})
  }
}

/* ================= updateProfile ================= */

export const updateProfile = async (req, res) => {
  try {
    const {userId} = req;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: req.file.path },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile image updated successfully",
      avatar: user.avatar,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};