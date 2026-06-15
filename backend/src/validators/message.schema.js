import Joi from "joi";

export const sendMessageSchema = Joi.object({
  text: Joi.string().trim().max(5000).allow("").optional(),
  imageMessage: Joi.string().uri().optional(),
}).or("text", "imageMessage"); // at least one is required
