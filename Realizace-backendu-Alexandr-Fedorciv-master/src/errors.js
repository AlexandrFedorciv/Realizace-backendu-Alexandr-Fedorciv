class AppError extends Error {
  constructor(code, message, statusCode = 400) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

function handleError(res, e) {
  if (e instanceof AppError) {
    return res.status(e.statusCode).json({ code: e.code, message: e.message });
  }
  console.error(e);
  res.status(500).json({ code: "internalError", message: e.message });
}

module.exports = { AppError, handleError };
