// ============================================================================
// MODELS EXPORTS
// ============================================================================
// Centralized export file for all Sequelize models
// Import all models here and export them for use throughout the application

// Models
import BaseModel from '../models/BaseModel.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import ProductCategory from '../models/ProductCategory.js';
import initAssociations from '../models/associations.js';

const models = {
  User,
  Product,
  BaseModel,
  ProductCategory,
};

// Initialize associations using the external logic
initAssociations(models);

export {
  User,
  Product,
  BaseModel,
  ProductCategory,
};
