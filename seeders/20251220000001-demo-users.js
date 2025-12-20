// ============================================================================
// USERS SEEDER
// ============================================================================
// Seed initial users for development/testing

import { PasswordUtil } from '#utils';

export async function up(queryInterface, Sequelize) {
  const hashedPassword = await PasswordUtil.hashPassword('Password123!');
  const now = new Date();

  await queryInterface.bulkInsert('users', [
    {
      id: Sequelize.fn('uuid_generate_v4'),
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      phone_number: '+1234567890',
      avatar: null,
      is_active: true,
      is_verified: true,
      last_login_at: null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
    {
      id: Sequelize.fn('uuid_generate_v4'),
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
      phone_number: '+1234567891',
      avatar: null,
      is_active: true,
      is_verified: true,
      last_login_at: null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
    {
      id: Sequelize.fn('uuid_generate_v4'),
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      phone_number: '+1234567892',
      avatar: null,
      is_active: true,
      is_verified: true,
      last_login_at: null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('users', null, {});
}
