import { DataTypes } from 'sequelize';
import { BaseModel } from '#models';
import { sequelize } from '#configs';


class User extends BaseModel {
  static init() {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [2, 50],
          },
        },
        lastName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [2, 50],
          },
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
            notEmpty: true,
          },
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        avatar: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        lastLoginAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      },
    );
  }
}

// Initialize the model
User.init();

export default User;
