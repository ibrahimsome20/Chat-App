// Generic Joi validation middleware.
// Usage: router.post("/login", validate(loginSchema), login)
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false, // collect all errors
    stripUnknown: true, // drop fields not in the schema (also kills $-operator injection)
  });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((d) => d.message),
    });
  }

  req.body = value;
  next();
};

export default validate;
