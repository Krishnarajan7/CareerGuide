/**
 * Validation middleware using Zod schemas
 * Supports validation of body, params, and query
 * @param {ZodSchema} schema
 */
export const validate = (schema) => (req, res, next) => {
  const data = {
    body: req.body,
    params: req.params,
    query: req.query,
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map(e => ({
      path: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  next();
};
