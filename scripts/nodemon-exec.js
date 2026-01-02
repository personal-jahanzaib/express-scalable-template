#!/usr/bin/env node
import { execSync } from 'child_process';
import ConsoleLogger from '../src/utils/ConsoleLogger.js';

const logger = ConsoleLogger;
logger.setContext('DevServer');

const args = process.argv.slice(2);
const filename = args[0];

// Check if nodemon passed the literal placeholder (initial start) or a real file
const isInitialStart = filename === '{{filename}}';

try {
  if (isInitialStart) {
    // INITIAL START: Just run the app, skip focused checks
    // We don't want to lint/validate EVERYTHING on every restart, only changed files.
    // So on first boot, we assume pre-commit hooks handled safety.
    logger.info('Starting application...');
    execSync('node app.js', { stdio: 'inherit' });
  } else {
    // FILE CHANGE: Run checks on the specific file, then restart app
    logger.info(`File changed: ${filename}`);

    // 1. Validate Types
    logger.debug('Running type validation...');
    execSync(`node scripts/validate-types.js "${filename}"`, { stdio: 'inherit' });

    // 2. Runtime Linting (Critical rules only)
    logger.debug('Running runtime linting...');
    execSync(`npx eslint -c .eslintrc.runtime.json "${filename}"`, { stdio: 'inherit' });

    // 3. Restart App
    // eslint-disable-next-line no-console
    console.log(); // Spacing
    execSync('node app.js', { stdio: 'inherit' });
  }
} catch (error) {
  // If any check fails, the execSync will throw.
  // We want to exit with error to stop nodemon from restarting the app if checks fail
  if (error.status) {
    process.exit(error.status);
  }
  process.exit(1);
}
