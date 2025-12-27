/* eslint-disable no-console, no-underscore-dangle */
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

process.chdir(rootDir);

if (!existsSync('node_modules')) {
  console.log('📦 node_modules not found. Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

console.log('🚀 Starting development server...');
try {
  // Use 'npm run dev' which triggers nodemon
  // We use execSync which will keep the process alive
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  // execSync throws if the process is terminated with a non-zero exit code
  // which is normal when stopping the task
  if (error.status !== 0 && error.status !== null) {
    console.error('❌ Application exited with error:', error.message);
  }
}
