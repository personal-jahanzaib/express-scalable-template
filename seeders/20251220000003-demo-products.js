// ============================================================================
// PRODUCTS SEEDER
// ============================================================================
// Seed 100 products using provided category IDs and placeholder images

export async function up(queryInterface, Sequelize) {
  const categoryIds = [
    '62e27314-0959-4294-b2aa-d83dd60b2dea',
    '82ed6574-3ab6-4896-bc38-795f9463af7c',
    '9a0d5250-378a-4db9-89d3-22e44bc824da',
    'f53f9233-30f0-4022-b183-5ef95d87257d',
    'f739122a-5a76-4c34-b878-1c715467b4b3',
  ];

  const now = new Date();
  const products = [];

  const adjectives = ['Premium', 'Deluxe', 'Smart', 'Elite', 'Basic', 'Ultra', 'Eco', 'Advanced', 'Modern', 'Classic'];
  const nouns = ['Product', 'Device', 'Item', 'Gadget', 'Tool', 'Essential', 'Unit', 'Model', 'Series', 'X'];

  for (let i = 1; i <= 100; i += 1) {
    const categoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    products.push({
      id: Sequelize.fn('uuid_generate_v4'),
      category_id: categoryId,
      name: `${adj} ${noun} ${i}`,
      description: `Detailed description for ${adj} ${noun} ${i}. This is a high-quality product designed for daily use.`,
      price: parseFloat((Math.random() * (500 - 10) + 10).toFixed(2)),
      stock_quantity: Math.floor(Math.random() * 200) + 1,
      sku: `PROD-${categoryId.substring(0, 4)}-${1000 + i}`,
      image_url: `https://picsum.photos/600/400?random=${i}`,
      is_active: true,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    });
  }

  await queryInterface.bulkInsert('products', products);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('products', null, {});
}
