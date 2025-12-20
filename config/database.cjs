// ============================================================================
// SEQUELIZE CLI DATABASE CONFIGURATION
// ============================================================================
// CommonJS wrapper for Sequelize CLI to use env.js configuration

// Suppress dotenv informational messages
process.env.DOTENV_CONFIG_QUIET = 'true';
require('dotenv').config();

const env = process.env;
const environment = env.NODE_ENV || 'local';

/**
 * Helper function to get environment-specific variable
 */
const getEnvVar = (prefix, suffix = '') => {
    const envMap = {
        local: suffix ? `${prefix}_LOCAL_${suffix}` : `${prefix}_LOCAL`,
        development: suffix ? `${prefix}_DEV_${suffix}` : `${prefix}_DEV`,
        staging: suffix ? `${prefix}_STAGING_${suffix}` : `${prefix}_STAGING`,
        production: suffix ? `${prefix}_PROD_${suffix}` : `${prefix}_PROD`,
    };

    const key = envMap[environment];
    return env[key];
};

module.exports = {
    [environment]: {
        username: getEnvVar('DB', 'USER'),
        password: getEnvVar('DB', 'PASSWORD'),
        database: getEnvVar('DB', 'NAME'),
        host: getEnvVar('DB', 'HOST'),
        port: parseInt(getEnvVar('DB', 'PORT'), 10) || 5432,
        dialect: getEnvVar('DB', 'DIALECT') || 'postgres',
        logging: false,
        seederStorage: 'sequelize',
        seederStorageTableName: 'SequelizeData',
    },
};
