class ErrorUtil {
  static throwError(message, statusCode = 500, shouldLog = true) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.shouldLog = shouldLog;
    error.isOperational = true; // Mark as an expected error
    throw error;
  }
}

export default ErrorUtil;
