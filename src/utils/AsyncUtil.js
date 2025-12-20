/**
 * AsyncUtil - Utility class for handling async operations
 * All methods are static - no instantiation required
 */

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
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default AsyncUtil;
