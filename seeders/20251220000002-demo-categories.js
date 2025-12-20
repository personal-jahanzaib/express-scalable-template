// ============================================================================
// PRODUCT CATEGORIES SEEDER
// ============================================================================
// Seed initial product categories for development/testing

export async function up(queryInterface, Sequelize) {
  const now = new Date();

  await queryInterface.bulkInsert('product_categories', [
    {
      id: Sequelize.fn('uuid_generate_v4'),
      name: 'Electronics',
      description: 'Gadgets, devices and electronic accessories',
      is_active: true,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
    {
      id: Sequelize.fn('uuid_generate_v4'),
      name: 'Clothing',
      description: 'Apparel, footwear and fashion items',
      is_active: true,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
    {
      id: Sequelize.fn('uuid_generate_v4'),
      name: 'Home & Kitchen',
      description: 'Furniture, appliances and decor',
      is_active: true,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
    {
      id: Sequelize.fn('uuid_generate_v4'),
      name: 'Books',
      description: 'Educational material, fiction and non-fiction',
      is_active: true,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
    {
      id: Sequelize.fn('uuid_generate_v4'),
      name: 'Sports & Outdoors',
      description: 'Gym equipment, sports gear and outdoor supplies',
      is_active: true,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('product_categories', null, {});
}
