/* eslint-disable no-console */
// ============================================================================
// CONSOLE LOGGER UTILITY (NestJS-Style)
// ============================================================================
// Beautiful console logger with colors, timestamps, and context
// Inspired by NestJS Logger

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',

  // Text colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // Background colors
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
};

// Context color mapping - Define custom colors for each context
const contextColors = {
  Environment: colors.magenta,
  Startup: colors.cyan,
  Application: colors.blue,
  Controller: colors.green,
  Service: colors.yellow,
  TypeValidator: colors.magenta,
  Database: colors.cyan,
  Middleware: colors.blue,
  // Add more contexts as needed
};

// Get color for context (falls back to yellow if not defined)
const getContextColor = (context) => contextColors[context] || colors.yellow;


// Logger class
class ConsoleLogger {
  constructor(context = '') {
    this.context = context;
  }

  // Log level
  log(message, context) {
    const ctx = context || this.context;

    if (ctx) {
      console.log(`${getContextColor(ctx)}[${ctx}]${colors.reset} ${colors.green}${message}${colors.reset}`);
    } else {
      console.log(`${colors.green}${message}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  // Error level
  error(message, trace, context) {
    const ctx = context || this.context;

    if (ctx) {
      console.error(`${getContextColor(ctx)}[${ctx}]${colors.reset} ${colors.red}${message}${colors.reset}`);
    } else {
      console.error(`${colors.red}${message}${colors.reset}`);
    }

    if (trace) {
      console.error(`${colors.dim}${trace}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  // Warn level
  warn(message, context) {
    const ctx = context || this.context;

    if (ctx) {
      console.warn(`${getContextColor(ctx)}[${ctx}]${colors.reset} ${colors.yellow}${message}${colors.reset}`);
    } else {
      console.warn(`${colors.yellow}${message}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  // Debug level
  debug(message, context) {
    const ctx = context || this.context;

    if (ctx) {
      console.debug(`${getContextColor(ctx)}[${ctx}]${colors.reset} ${colors.magenta}${message}${colors.reset}`);
    } else {
      console.debug(`${colors.magenta}${message}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  // Verbose level
  verbose(message, context) {
    const ctx = context || this.context;

    if (ctx) {
      console.log(`${getContextColor(ctx)}[${ctx}]${colors.reset} ${colors.cyan}${message}${colors.reset}`);
    } else {
      console.log(`${colors.cyan}${message}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  // Success level (custom)
  success(message, context) {
    const ctx = context || this.context;

    if (ctx) {
      console.log(`${getContextColor(ctx)}[${ctx}]${colors.reset} ${colors.bright}${colors.green}${message}${colors.reset}`);
    } else {
      console.log(`${colors.bright}${colors.green}${message}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  // Info level (custom)
  info(message, context) {
    const ctx = context || this.context;

    if (ctx) {
      console.info(`${getContextColor(ctx)}[${ctx}]${colors.reset} ${colors.blue}${message}${colors.reset}`);
    } else {
      console.info(`${colors.blue}${message}${colors.reset}`);
    }
    console.log(); // Add spacing
  }

  // Set context
  setContext(context) {
    this.context = context;
  }
}

// Create default logger instance
const logger = new ConsoleLogger();

// Export default logger instance
export default logger;
