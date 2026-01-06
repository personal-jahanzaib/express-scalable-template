#!/usr/bin/env node
/* eslint-disable no-underscore-dangle */
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Logger from '../src/utils/Logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

process.chdir(rootDir);

const logger = new Logger('Startup');

// Read package.json for version info
const packageJson = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));

// Show startup info - format: "Express Scalable Template v1.0.0"
const appName = packageJson.name
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

logger.info(`${appName} v${packageJson.version}`);
logger.log('Initializing application...');

if (!existsSync('node_modules')) {
  logger.info('node_modules not found. Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    logger.error(`Failed to install dependencies: ${error.message}`);
    process.exit(1);
  }
}

try {
  // Run nodemon directly without npm (to avoid npm output)
  execSync('npx nodemon --silent', { stdio: 'inherit' });
} catch (error) {
  // execSync throws if the process is terminated with a non-zero exit code
  // which is normal when stopping the task
  if (error.status !== 0 && error.status !== null) {
    logger.error(`Application exited with error: ${error.message}`);
  }
}
