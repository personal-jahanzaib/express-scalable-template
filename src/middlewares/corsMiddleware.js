// ============================================================================
// CORS MIDDLEWARE
// ============================================================================
// Middleware to enable Cross-Origin Resource Sharing with specific configurations

import cors from 'cors';
import config from '#env';
import { httpResponse } from '#constants';

/**
 * CORS middleware configuration
 * Uses values from environment variables or defaults
 */
const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) { return callback(null, true); }

    const allowedOrigins = config.cors.origin;

    // Check if the origin is in the allowed list or if all origins are allowed (*)
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(httpResponse.CORS_ERROR.message), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
});

export default corsMiddleware;
