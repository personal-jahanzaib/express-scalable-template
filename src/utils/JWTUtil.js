/**
 * JWTUtil - Utility class for JWT token operations
 * All methods are static - no instantiation required
 */

import jwt from 'jsonwebtoken';
import config from '#env';

class JWTUtil {
  // eslint-disable-next-line no-magic-numbers
  static MILLISECONDS_PER_SECOND = 1000;

  // eslint-disable-next-line no-magic-numbers
  static BEARER_PREFIX_LENGTH = 7; // "Bearer ".length

  /**
     * Create a JWT access token
     * @param {object} payload - Data to encode in the token
     * @param {string} expiresIn - Token expiration time (optional)
     * @returns {string} JWT token
     */
  static createAccessToken(payload, expiresIn = config.jwt.expiresIn) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn,
    });
  }

  /**
     * Create a JWT refresh token
     * @param {object} payload - Data to encode in the token
     * @param {string} expiresIn - Token expiration time (optional)
     * @returns {string} JWT refresh token
     */
  static createRefreshToken(payload, expiresIn = config.jwt.refreshExpiresIn) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn,
    });
  }

  /**
     * Validate and decode a JWT token
     * @param {string} token - JWT token to validate
     * @returns {object} Decoded token payload
     * @throws {Error} If token is invalid or expired
     */
  static validateToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      return {
        valid: true,
        decoded,
        error: null,
      };
    } catch (error) {
      return {
        valid: false,
        decoded: null,
        error: error.message,
      };
    }
  }

  /**
     * Decode token without verification (use with caution)
     * @param {string} token - JWT token to decode
     * @returns {object} Decoded token payload
     */
  static decodeToken(token) {
    return jwt.decode(token);
  }

  /**
     * Check if token is expired
     * @param {string} token - JWT token to check
     * @returns {boolean} True if token is expired
     */
  static isTokenExpired(token) {
    const decoded = JWTUtil.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / JWTUtil.MILLISECONDS_PER_SECOND);
    return decoded.exp < currentTime;
  }

  /**
     * Get token expiration time
     * @param {string} token - JWT token
     * @returns {Date|null} Expiration date or null if invalid
     */
  static getTokenExpiration(token) {
    const decoded = JWTUtil.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    return new Date(decoded.exp * JWTUtil.MILLISECONDS_PER_SECOND);
  }

  /**
     * Extract token from Authorization header
     * @param {string} authHeader - Authorization header value
     * @returns {string|null} Token or null if invalid format
     */
  static extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(JWTUtil.BEARER_PREFIX_LENGTH);
  }
}

export default JWTUtil;
