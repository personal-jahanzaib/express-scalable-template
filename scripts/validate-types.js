#!/usr/bin/env node
/* eslint-disable no-underscore-dangle, no-cond-assign, no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Logger from '../src/utils/Logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');


/**
 * Extracts type information from variable declarations
 * @param {string} code - Source code
 * @returns {Object} Map of variable names to their inferred types
 */
function extractTypes(code) {
  const typeMap = {};

  // Match JSDoc type annotations
  const jsdocRegex = /\/\*\*\s*\n\s*@type\s*\{\s*(\w+)\s*\}\s*\n\s*\*\/\s*const\s+(\w+)/g;
  let match;
  while ((match = jsdocRegex.exec(code)) !== null) {
    const type = match[1];
    const varName = match[2];
    typeMap[varName] = type;
  }

  // Match const/let assignments with literal values
  const assignmentRegex = /(?:const|let|var)\s+(\w+)\s*=\s*([^;]+);/g;
  while ((match = assignmentRegex.exec(code)) !== null) {
    const varName = match[1];
    const value = match[2].trim();

    // Only infer if we haven't already set type from JSDoc
    if (!typeMap[varName]) {
      if (/^(['"`]).*\1$/.test(value)) {
        // String literal
        typeMap[varName] = 'string';
      } else if (/^\d+(\.\d+)?$/.test(value)) {
        // Number literal
        typeMap[varName] = 'number';
      } else if (/^(true|false)$/.test(value)) {
        // Boolean literal
        typeMap[varName] = 'boolean';
      }
    }
  }

  return typeMap;
}

/**
 * Finds all binary addition operations
 * @param {string} code - Source code
 * @returns {Array} Array of operations with line numbers
 */
function findBinaryOperations(code) {
  const operations = [];
  const lines = code.split('\n');
  const addRegex = /(\w+)\s*\+\s*(\w+)/g;

  lines.forEach((line, lineNum) => {
    let match;
    while ((match = addRegex.exec(line)) !== null) {
      operations.push({
        line: lineNum + 1,
        left: match[1],
        right: match[2],
        fullMatch: match[0],
      });
    }
  });

  return operations;
}

/**
 * Validates type compatibility
 * @param {string} type1 - First type
 * @param {string} type2 - Second type
 * @returns {boolean} True if types are compatible
 */
function isCompatible(type1, type2) {
  if (!type1 || !type2 || type1 === 'unknown' || type2 === 'unknown') {
    return true; // Skip if type unknown
  }

  // Allow same types
  if (type1 === type2) {
    return true;
  }

  // Allow number + number, string + string
  if (
    (type1 === 'number' && type2 === 'number')
    || (type1 === 'string' && type2 === 'string')
  ) {
    return true;
  }

  return false;
}

/**
 * Validates a single file
 * @param {string} filePath - Path to file
 * @returns {Array} Array of errors found
 */
function validateFile(filePath) {
  const errors = [];

  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const typeMap = extractTypes(code);
    const operations = findBinaryOperations(code);

    operations.forEach((op) => {
      const leftType = typeMap[op.left];
      const rightType = typeMap[op.right];

      if (leftType && rightType && !isCompatible(leftType, rightType)) {
        errors.push({
          file: filePath,
          line: op.line,
          message: `Type mismatch: cannot add ${leftType} (${op.left}) and ${rightType} (${op.right})`,
          code: op.fullMatch,
        });
      }
    });
  } catch (err) {
    Logger.error(`Error reading file ${filePath}:`, err.message);
  }

  return errors;
}

/**
 * Recursively find all JS files
 * @param {string} dir - Directory to search
 * @returns {Array} Array of file paths
 */
function findJSFiles(dir) {
  const files = [];

  try {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules and hidden folders
        if (!item.startsWith('.') && item !== 'node_modules') {
          files.push(...findJSFiles(fullPath));
        }
      } else if (item.endsWith('.js')) {
        files.push(fullPath);
      }
    });
  } catch (err) {
    Logger.error(`Error reading directory ${dir}:`, err.message);
  }

  return files;
}

// Main execution
const args = process.argv.slice(2);
let jsFiles = [];

if (args.length > 0 && args[0] !== '{{filename}}') {
  // Validate provided files (absolute or relative)
  args.forEach((arg) => {
    const filePath = path.isAbsolute(arg) ? arg : path.join(rootDir, arg);
    if (filePath.endsWith('.js')) {
      jsFiles.push(filePath);
    }
  });
} else {
  // Validate all files (fallback) - silent
  jsFiles = findJSFiles(rootDir);
}

let allErrors = [];

jsFiles.forEach((file) => {
  const errors = validateFile(file);
  allErrors = allErrors.concat(errors);
});

// Report results
if (allErrors.length > 0) {
  Logger.error('Type Validation Errors Found:');
  allErrors.forEach((err) => {
    const relPath = path.relative(rootDir, err.file);
    Logger.error(`${relPath}:${err.line}`);
    Logger.error(`  ${err.message}`);
    Logger.error(`  Code: ${err.code}\n`);
  });
  process.exit(1);
}
// Success is silent - no output needed
process.exit(0);
