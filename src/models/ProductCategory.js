import { DataTypes } from 'sequelize';
import { BaseModel } from '#models';
import { sequelize } from '#configs';

class ProductCategory extends BaseModel {
  static init() {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'ProductCategory',
        tableName: 'product_categories',
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products',
    });
  }
}

ProductCategory.init();

export default ProductCategory;
