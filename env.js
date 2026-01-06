import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Logger from './src/utils/Logger.js';

// Check if .env file exists
const envPath = path.resolve(process.cwd(), '.env');

const logger = new Logger('Environment');


if (!fs.existsSync(envPath)) {
  logger.error('.env file not found!');
  logger.error(`Expected location: ${envPath}`);
  logger.error('Please create a .env file with the required environment variables.');
  process.exit(1);
}

// Suppress dotenv informational messages
process.env.DOTENV_CONFIG_QUIET = 'true';
dotenv.config();

const { env } = process;
const environment = env.NODE_ENV || 'local';


const getEnvVar = (prefix, suffix = '') => {
  const envMap = {
    local: suffix ? `${prefix}_LOCAL_${suffix}` : `${prefix}_LOCAL`,
    development: suffix ? `${prefix}_DEV_${suffix}` : `${prefix}_DEV`,
    staging: suffix ? `${prefix}_STAGING_${suffix}` : `${prefix}_STAGING`,
    production: suffix ? `${prefix}_PROD_${suffix}` : `${prefix}_PROD`,
  };

  const key = envMap[environment];
  return env[key];
};

/**
 * Application configuration object
 * Centralizes all environment variables for easy access throughout the app
 */
const config = {
  // ============================================================================
  // SERVER CONFIGURATION
  // ============================================================================
  server: {
    port: parseInt(env.PORT, 10) || 3000,
    environment,
  },

  // ============================================================================
  // DATABASE CONFIGURATION (Environment-specific)
  // ============================================================================
  database: {
    host: getEnvVar('DB', 'HOST'),
    port: parseInt(getEnvVar('DB', 'PORT'), 10) || 5432,
    name: getEnvVar('DB', 'NAME'),
    user: getEnvVar('DB', 'USER'),
    password: getEnvVar('DB', 'PASSWORD'),
    dialect: getEnvVar('DB', 'DIALECT') || 'postgres',
  },

  // ============================================================================
  // JWT CONFIGURATION
  // ============================================================================
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // ============================================================================
  // CLIENT-SIDE URL CONFIGURATION (Environment-specific)
  // ============================================================================
  client: {
    url: getEnvVar('CLIENT_URL'),
  },

  // ============================================================================
  // CORS CONFIGURATION (Environment-specific)
  // ============================================================================
  cors: {
    origin: getEnvVar('CORS_ORIGIN')?.split(',') || [],
  },

  // ============================================================================
  // API CONFIGURATION
  // ============================================================================
  api: {
    version: env.API_VERSION || 'v1',
    prefix: env.API_PREFIX || 'api',
    rateLimit: {
      maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
      windowMinutes: parseInt(env.RATE_LIMIT_WINDOW_MINUTES, 10) || 15,
    },
  },

  // ============================================================================
  // EMAIL CONFIGURATION (Optional)
  // ============================================================================
  email: {
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT, 10) || 587,
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
    fromName: env.EMAIL_FROM_NAME || 'Express Template',
    fromAddress: env.EMAIL_FROM_ADDRESS,
  },
};

export default config;
