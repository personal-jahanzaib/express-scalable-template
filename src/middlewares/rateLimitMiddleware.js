import rateLimit from 'express-rate-limit';
import config from '#env';
import { ResponseUtil } from '#utils';
import { httpResponse } from '#constants';

/**
 * Rate limit middleware configuration
 * Uses values from environment variables or defaults
 */
const rateLimitMiddleware = rateLimit({
  windowMs: config.api.rateLimit.windowMinutes * 60 * 1000, // Convert minutes to milliseconds
  max: config.api.rateLimit.maxRequests, // Limit each IP to X requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    ResponseUtil.error(
      res,
      httpResponse.TOO_MANY_REQUESTS.message,
      httpResponse.TOO_MANY_REQUESTS.code,
    );
  },
});

export default rateLimitMiddleware;
