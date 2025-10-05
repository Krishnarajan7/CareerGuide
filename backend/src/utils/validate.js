/**
 * Validation middleware using Zod schemas
 * Supports validation of body, params, and query
 * @param {ZodSchema} schema
 */
export const validate = (schema) => (req, res, next) => {
  try {
    const data = {
      body: req.body,
      params: req.params,
      query: req.query,
    };
    schema.parse(data);

    next();
  } catch (err) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors?.map(e => ({
        path: e.path.join("."),
        message: e.message,
      })) || [err.message],
    });
  }
};
