import morgan from 'morgan';
import config from '#env';


/**
 * Request logger middleware
 * Only logs requests when NODE_ENV is 'local'
 * Uses 'dev' format for colored, concise output
 */
const requestLogger = config.server.environment === 'local'
  ? morgan('dev')
  : (req, res, next) => next(); // No-op middleware in production

export default requestLogger;
