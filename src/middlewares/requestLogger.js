import { Logger } from '#utils';
import config from '#env';

const logger = new Logger('Middleware');

/**
 * Request logger middleware
 * Only logs requests when NODE_ENV is 'local'
 * Logs HTTP method, URL, status code, and response time
 */
const requestLogger = config.server.environment === 'local'
  ? (req, res, next) => {
    const start = Date.now();

    // Capture the original end function
    const originalEnd = res.end;

    // Override res.end to log after response is sent
    res.end = function endWithLogging(...args) {
      const duration = Date.now() - start;
      const { method, originalUrl } = req;
      const { statusCode } = res;

      // Color code based on status code
      const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;

      // eslint-disable-next-line no-magic-numbers
      if (statusCode >= 500) {
        logger.error(message);
        // eslint-disable-next-line no-magic-numbers
      } else if (statusCode >= 400) {
        logger.warn(message);
      } else {
        logger.info(message);
      }

      // Call the original end function
      return originalEnd.apply(this, args);
    };

    next();
  }
  : (_, __, next) => next(); // No-op middleware in production

export default requestLogger;
