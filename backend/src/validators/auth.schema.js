import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(8).max(128).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
});

export const verifyOtpSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  code: Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required()
    .messages({ "string.pattern.base": "code must be 6 digits" }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  code: Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required()
    .messages({ "string.pattern.base": "code must be 6 digits" }),
  newPassword: Joi.string().min(8).max(128).required(),
});

export const resendOtpSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  type: Joi.string().valid("verify", "reset").required(),
});
