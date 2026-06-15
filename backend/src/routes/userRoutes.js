import express from 'express'
import rateLimit from 'express-rate-limit'
import upload from "../middlewares/multer.js";
import {
  getMe,
  login,
  logout,
  signUp,
  updateProfile,
  verifyEmail,
  resendOtp,
  forgotPassword,
  resetPassword,
} from '../controllers/userControllers.js'
import { protectRoute } from '../middlewares/checkAuth.js'
import validate from '../middlewares/validate.js'
import {
  signUpSchema,
  loginSchema,
  verifyOtpSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/auth.schema.js'

const router = express.Router()

//limit brute-force attempts on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts, please try again later" },
})

//verfiy token
router.get('/auth', protectRoute, getMe)

router.post('/signUp', authLimiter, validate(signUpSchema), signUp)
router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/logout', logout)

// email verification + password reset (OTP via email)
router.post('/verify-email', authLimiter, validate(verifyOtpSchema), verifyEmail)
router.post('/resend-otp', authLimiter, validate(resendOtpSchema), resendOtp)
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword)
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword)

router.patch('/updateProfile', protectRoute, upload.single("avatar"), updateProfile)

export default router
