import jwt from 'jsonwebtoken';
import config from '#env';

class JWTUtil {
  static MILLISECONDS_PER_SECOND = 1000;

  static BEARER_PREFIX_LENGTH = 7; // "Bearer ".length

  static createAccessToken(payload, expiresIn = config.jwt.expiresIn) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn,
    });
  }

  static createRefreshToken(payload, expiresIn = config.jwt.refreshExpiresIn) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn,
    });
  }

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

  static decodeToken(token) {
    return jwt.decode(token);
  }

  static isTokenExpired(token) {
    const decoded = JWTUtil.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / JWTUtil.MILLISECONDS_PER_SECOND);
    return decoded.exp < currentTime;
  }

  static getTokenExpiration(token) {
    const decoded = JWTUtil.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }
    return new Date(decoded.exp * JWTUtil.MILLISECONDS_PER_SECOND);
  }

  static extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(JWTUtil.BEARER_PREFIX_LENGTH);
  }
}

export default JWTUtil;
