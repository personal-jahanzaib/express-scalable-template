// ============================================================================
// LOGGER UTILITY
// ============================================================================
// Winston-based logging utility with category-based loggers
// Logs to both main.log and category-specific log files

import winston from 'winston';
import path from 'path';

// Define custom log levels with colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'blue',
    debug: 'gray',
  },
};

// Add colors to winston
winston.addColors(customLevels.colors);

// Custom timestamp format: DD-MM-YYYY hh:mm:ss (12-hour format)
const timestampFormat = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Convert to 12-hour format (0-23 to 1-12)
  // eslint-disable-next-line no-magic-numbers
  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, '0');

  return `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds}`;
};

// Custom log format
const logFormat = (category) => winston.format.combine(
  winston.format.timestamp({ format: timestampFormat }),
  winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] [${category.toUpperCase()}] ${level.toUpperCase()}: ${message}`),
);

// Create logger factory function
const createLogger = (category) => {
  const logsDir = path.join(process.cwd(), 'logs');

  return winston.createLogger({
    levels: customLevels.levels,
    format: logFormat(category),
    transports: [
      // Main log file - all logs from all categories
      new winston.transports.File({
        filename: path.join(logsDir, 'main.log'),
        level: 'debug',
      }),
      // Category-specific log file
      new winston.transports.File({
        filename: path.join(logsDir, `${category}.log`),
        level: 'debug',
      }),
      // Console output (only in development/local)
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: timestampFormat }),
          winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] [${category.toUpperCase()}] ${level}: ${message}`),
        ),
      }),
    ],
  });
};

// Export pre-built logger instances for common categories
export const controllerLogger = createLogger('controller');
export const databaseLogger = createLogger('database');
export const serviceLogger = createLogger('service');
export const middlewareLogger = createLogger('middleware');
export const routeLogger = createLogger('route');
export const utilLogger = createLogger('util');
