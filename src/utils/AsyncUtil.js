/**
 * AsyncUtil - Utility class for handling async operations
 * All methods are static - no instantiation required
 */

import { ResponseUtil, controllerLogger } from '#utils';
import { httpResponse } from '#constants';

class AsyncUtil {
  /**
   * Wraps an async route handler to catch errors automatically
   * Eliminates the need for try-catch blocks in every controller
   * @param {Function} fn - Async function to wrap
   * @returns {Function} Wrapped function that catches errors
   *
   * @example
   * // Without asyncHandler (manual try-catch)
   * const getUser = async (req, res, next) => {
   *     try {
   *         const user = await User.findById(req.params.id);
   *         res.json(user);
   *     } catch (error) {
   *         next(error);
   *     }
   * };
   *
   * // With asyncHandler (automatic error handling)
   * const getUser = asyncHandler(async (req, res) => {
   *     const user = await User.findById(req.params.id);
   *     res.json(user);
   * });
   */
  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((error) => {
        // Log the error only if shouldLog is true (default)
        if (error.shouldLog) {
          controllerLogger.error(`Controller error: ${error.message}`);
        }

        // Extract status code from error (if thrown by ErrorUtil)
        const statusCode = error.statusCode || httpResponse.INTERNAL_SERVER_ERROR.code;
        const message = error.message || httpResponse.INTERNAL_SERVER_ERROR.message;

        // Use ResponseUtil for standardized error response
        return ResponseUtil.error(res, message, statusCode);
      });
    };
  }
}

export default AsyncUtil;
