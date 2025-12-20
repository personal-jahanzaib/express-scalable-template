import { ResponseUtil, controllerLogger } from '#utils';
import { httpResponse } from '#constants';

class AsyncUtil {
  static asyncHandler(fn) {
    return async (req, res, next) => {
      try {
        return await fn(req, res, next);
      } catch (error) {
        // Log the error only if shouldLog exists and is true, or if it's missing (unexpected error)
        if (error.shouldLog !== false) {
          controllerLogger.error(`Controller error: ${error.message}`);
          if (error.stack) {
            controllerLogger.debug(error.stack);
          }
        }

        // Extract status code from error (if thrown by ErrorUtil)
        const statusCode = error.statusCode || httpResponse.INTERNAL_SERVER_ERROR.code;
        const message = error.message || httpResponse.INTERNAL_SERVER_ERROR.message;

        // Use ResponseUtil for standardized error response
        return ResponseUtil.error(res, message, statusCode);
      }
    };
  }
}

export default AsyncUtil;
