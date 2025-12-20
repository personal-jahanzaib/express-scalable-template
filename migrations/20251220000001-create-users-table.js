// ============================================================================
// CREATE USERS TABLE MIGRATION
// ============================================================================
// Migration to create users table with all necessary columns

export async function up(queryInterface, Sequelize) {
  // Enable UUID extension for PostgreSQL
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    avatar: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    last_login_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  // Add index on email for faster lookups
  await queryInterface.addIndex('users', ['email'], {
    name: 'users_email_idx',
    unique: true,
  });

  // Add index on deleted_at for paranoid queries
  await queryInterface.addIndex('users', ['deleted_at'], {
    name: 'users_deleted_at_idx',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('users');
}
