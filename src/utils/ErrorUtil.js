/**
 * ErrorUtil - Utility class for throwing standardized errors
 * All methods are static - no instantiation required
 */

class ErrorUtil {
  /**
   * Throw a standardized error
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (optional)
   * @param {boolean} shouldLog - Whether to log this error (default: true)
   * @throws {Error}
   */
  static throwError(message, statusCode = 500, shouldLog = true) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.shouldLog = shouldLog;
    throw error;
  }
}

export default ErrorUtil;
