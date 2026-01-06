#!/usr/bin/env node
import Logger from '../src/utils/Logger.js';

const logger = new Logger('Nodemon');
const event = process.argv[2];

if (event === 'start') {
  logger.info('Initializing application...');
} else if (event === 'restart') {
  logger.info('Changes detected. Re-validating and restarting...');
}
