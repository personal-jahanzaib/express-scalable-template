// ============================================================================
// AUTH MIDDLEWARE
// ============================================================================
// Middleware to validate JWT tokens and protect routes

import { httpResponse } from '#constants';
import { JWTUtil, ErrorUtil, AsyncUtil } from '#utils';

/**
 * Auth Middleware
 * Validates the JWT token in the Authorization header
 */
const authMiddleware = AsyncUtil.asyncHandler((req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = JWTUtil.extractTokenFromHeader(authHeader);

  if (!token) {
    ErrorUtil.throwError(
      'Access denied. No token provided.',
      httpResponse.UNAUTHORIZED.code,
      false,
    );
  }

  const { valid, decoded, error } = JWTUtil.validateToken(token);

  if (!valid) {
    ErrorUtil.throwError(
      `Invalid token: ${error}`,
      httpResponse.UNAUTHORIZED.code,
      false,
    );
  }

  // Attach decoded user data to request object
  req.user = decoded;

  next();
});

export default authMiddleware;
