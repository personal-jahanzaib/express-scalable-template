// ============================================================================
// CREATE PRODUCTS TABLE MIGRATION
// ============================================================================

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('products', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'product_categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    stock_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sku: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    image_url: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
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

  await queryInterface.addIndex('products', ['sku'], {
    name: 'products_sku_idx',
    unique: true,
  });

  await queryInterface.addIndex('products', ['category_id'], {
    name: 'products_category_id_idx',
  });

  await queryInterface.addIndex('products', ['deleted_at'], {
    name: 'products_deleted_at_idx',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('products');
}
