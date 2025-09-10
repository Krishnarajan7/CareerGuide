export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
}

export function errorHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  });
}


