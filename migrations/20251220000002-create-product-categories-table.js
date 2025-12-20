// ============================================================================
// CREATE PRODUCT CATEGORIES TABLE MIGRATION
// ============================================================================

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('product_categories', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
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

  await queryInterface.addIndex('product_categories', ['name'], {
    name: 'product_categories_name_idx',
    unique: true,
  });

  await queryInterface.addIndex('product_categories', ['deleted_at'], {
    name: 'product_categories_deleted_at_idx',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('product_categories');
}
