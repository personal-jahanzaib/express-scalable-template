/**
 * ErrorUtil - Utility class for throwing standardized errors
 * All methods are static - no instantiation required
 */

class ErrorUtil {
  /**
     * Throw a generic error
     * @param {string} message - Error message
     * @throws {Error}
     */
  static throwError(message) {
    throw new Error(message);
  }
}

export default ErrorUtil;
