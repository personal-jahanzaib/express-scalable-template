// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================
// Sequelize database connection configuration

import { Sequelize } from 'sequelize';
import config from '#env';

/**
 * Sequelize instance with database configuration
 * Automatically uses environment-based database settings
 */
const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  },
);

export default sequelize;
