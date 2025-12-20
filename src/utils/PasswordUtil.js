/**
 * PasswordUtil - Utility class for password hashing and comparison
 * Uses Node.js built-in crypto module with scrypt algorithm
 * All methods are static - no instantiation required
 */

import crypto from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(crypto.scrypt);

class PasswordUtil {
  // eslint-disable-next-line no-magic-numbers
  static SALT_BYTES = 16;

  // eslint-disable-next-line no-magic-numbers
  static KEY_LENGTH = 64;

  // eslint-disable-next-line no-magic-numbers
  static MIN_PASSWORD_LENGTH = 8;

  // eslint-disable-next-line no-magic-numbers
  static STRONG_PASSWORD_SCORE = 5;

  // eslint-disable-next-line no-magic-numbers
  static MEDIUM_PASSWORD_SCORE = 3;

  /**
     * Hash a password using scrypt
     * @param {string} password - Plain text password to hash
     * @returns {Promise<string>} Hashed password with salt
     */
  static async hashPassword(password) {
    const salt = crypto.randomBytes(PasswordUtil.SALT_BYTES).toString('hex');
    const derivedKey = await scrypt(password, salt, PasswordUtil.KEY_LENGTH);
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  /**
     * Compare a plain text password with a hashed password
     * @param {string} password - Plain text password
     * @param {string} hashedPassword - Hashed password with salt
     * @returns {Promise<boolean>} True if passwords match
     */
  static async comparePassword(password, hashedPassword) {
    const [salt, key] = hashedPassword.split(':');
    const derivedKey = await scrypt(password, salt, PasswordUtil.KEY_LENGTH);
    return key === derivedKey.toString('hex');
  }

  /**
     * Generate a random password
     * @param {number} length - Length of password (default: 16)
     * @returns {string} Random password
     */
  static generateRandomPassword(length = PasswordUtil.SALT_BYTES) {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
  }

  /**
     * Generate a secure random token (for password reset, email verification, etc.)
     * @param {number} bytes - Number of random bytes (default: 32)
     * @returns {string} Random token
     */
  static generateToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {object} Validation result with strength score
     */
  static validatePasswordStrength(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const checks = {
      minLength: password.length >= PasswordUtil.MIN_PASSWORD_LENGTH,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    };

    const passedChecks = Object.values(checks).filter(Boolean).length;

    let strength = 'weak';
    if (passedChecks === PasswordUtil.STRONG_PASSWORD_SCORE) {
      strength = 'strong';
    } else if (passedChecks >= PasswordUtil.MEDIUM_PASSWORD_SCORE) {
      strength = 'medium';
    }

    return {
      valid: checks.minLength && passedChecks >= PasswordUtil.MEDIUM_PASSWORD_SCORE,
      strength,
      checks,
      score: passedChecks,
    };
  }
}

export default PasswordUtil;
