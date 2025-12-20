import crypto from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(crypto.scrypt);

class PasswordUtil {
  static SALT_BYTES = 16;

  static KEY_LENGTH = 64;

  static MIN_PASSWORD_LENGTH = 8;

  static STRONG_PASSWORD_SCORE = 5;

  static MEDIUM_PASSWORD_SCORE = 3;

  static async hashPassword(password) {
    const salt = crypto.randomBytes(PasswordUtil.SALT_BYTES).toString('hex');
    const derivedKey = await scrypt(password, salt, PasswordUtil.KEY_LENGTH);
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  static async comparePassword(password, hashedPassword) {
    const [salt, key] = hashedPassword.split(':');
    const derivedKey = await scrypt(password, salt, PasswordUtil.KEY_LENGTH);
    return key === derivedKey.toString('hex');
  }

  static generateRandomPassword(length = PasswordUtil.SALT_BYTES) {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
  }

  static generateToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }

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
