import { DataTypes } from 'sequelize';
import { BaseModel } from '#models';
import { sequelize } from '#configs';

class Product extends BaseModel {
  static init() {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'product_categories',
            key: 'id',
          },
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.00,
          validate: {
            isDecimal: true,
            min: 0,
          },
        },
        stockQuantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          validate: {
            isInt: true,
            min: 0,
          },
        },
        sku: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        imageUrl: {
          type: DataTypes.STRING(255),
          allowNull: true,
          validate: {
            isUrl: true,
          },
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.ProductCategory, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  }
}

Product.init();

export default Product;
