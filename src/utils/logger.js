/* eslint-disable no-console */
import winston from 'winston';
import path from 'path';

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Context color mapping
const contextColors = {
  Environment: colors.magenta,
  Application: colors.blue,
  Controller: colors.green,
  Service: colors.yellow,
  Database: colors.cyan,
  Middleware: colors.blue,
  Route: colors.cyan,
  Util: colors.magenta,
};

const getContextColor = (context) => contextColors[context] || colors.yellow;

// Custom timestamp format
const timestampFormat = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  // eslint-disable-next-line no-magic-numbers
  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, '0');
  return `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds}`;
};

// Winston log levels
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    debug: 4,
    verbose: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'blue',
    debug: 'magenta',
    verbose: 'cyan',
  },
};

winston.addColors(customLevels.colors);

class Logger {
  #context = '';

  #winstonLogger = null;

  #useConsole = false;

  constructor(context = '') {
    this.#context = context;
    // Use process.env directly to avoid circular dependency with config
    const nodeEnv = process.env.NODE_ENV || 'local';
    this.#useConsole = ['local', 'development'].includes(nodeEnv);

    // Only create Winston logger if not using console
    if (!this.#useConsole) {
      this.#createWinstonLogger();
    }
  }

  #createWinstonLogger() {
    const logsDir = path.join(process.cwd(), 'logs');
    const logFormat = winston.format.combine(
      winston.format.timestamp({ format: timestampFormat }),
      winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] [${this.#context.toUpperCase()}] ${level.toUpperCase()}: ${message}`),
    );

    this.#winstonLogger = winston.createLogger({
      levels: customLevels.levels,
      format: logFormat,
      transports: [
        // Main log file - all logs
        new winston.transports.File({
          filename: path.join(logsDir, 'main.log'),
          level: 'verbose',
        }),
        // Context-specific log file
        new winston.transports.File({
          filename: path.join(logsDir, `${this.#context.toLowerCase()}.log`),
          level: 'verbose',
        }),
      ],
    });
  }

  setContext(context) {
    this.#context = context;
    // Recreate Winston logger with new context if in file mode
    if (!this.#useConsole) {
      this.#createWinstonLogger();
    }
  }

  #logToConsole(level, message, trace) {
    const ctx = this.#context;
    const contextPrefix = ctx ? `${getContextColor(ctx)}[${ctx}]${colors.reset} ` : '';

    switch (level) {
      case 'error':
        console.error(`${contextPrefix}${colors.red}${message}${colors.reset}`);
        if (trace) { console.error(`${colors.dim}${trace}${colors.reset}`); }
        break;
      case 'warn':
        console.warn(`${contextPrefix}${colors.yellow}${message}${colors.reset}`);
        break;
      case 'success':
        console.log(`${contextPrefix}${colors.bright}${colors.green}${message}${colors.reset}`);
        break;
      case 'info':
        console.info(`${contextPrefix}${colors.blue}${message}${colors.reset}`);
        break;
      case 'debug':
        console.debug(`${contextPrefix}${colors.magenta}${message}${colors.reset}`);
        break;
      case 'verbose':
        console.log(`${contextPrefix}${colors.cyan}${message}${colors.reset}`);
        break;
      default:
        console.log(`${contextPrefix}${colors.green}${message}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  log(message) {
    if (this.#useConsole) {
      this.#logToConsole('log', message);
    } else {
      this.#winstonLogger.info(message);
    }
  }

  error(message, trace) {
    if (this.#useConsole) {
      this.#logToConsole('error', message, trace);
    } else {
      this.#winstonLogger.error(trace ? `${message}\n${trace}` : message);
    }
  }

  warn(message) {
    if (this.#useConsole) {
      this.#logToConsole('warn', message);
    } else {
      this.#winstonLogger.warn(message);
    }
  }

  success(message) {
    if (this.#useConsole) {
      this.#logToConsole('success', message);
    } else {
      this.#winstonLogger.log('success', message);
    }
  }

  info(message) {
    if (this.#useConsole) {
      this.#logToConsole('info', message);
    } else {
      this.#winstonLogger.info(message);
    }
  }

  debug(message) {
    if (this.#useConsole) {
      this.#logToConsole('debug', message);
    } else {
      this.#winstonLogger.debug(message);
    }
  }

  verbose(message) {
    if (this.#useConsole) {
      this.#logToConsole('verbose', message);
    } else {
      this.#winstonLogger.verbose(message);
    }
  }
}

// Export Logger class so each module can create its own instance
export default Logger;
