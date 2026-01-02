#!/usr/bin/env node
import ConsoleLogger from '../src/utils/ConsoleLogger.js';

const logger = ConsoleLogger;
logger.setContext('Nodemon');
const event = process.argv[2];

if (event === 'start') {
  logger.info('Initializing application...');
} else if (event === 'restart') {
  logger.info('Changes detected. Re-validating and restarting...');
}
