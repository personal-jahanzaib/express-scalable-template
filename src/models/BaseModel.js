// ============================================================================
// BASE MODEL
// ============================================================================
// Base Sequelize model with common configurations
// All models should extend this base class

import { Model } from 'sequelize';

/**
 * Base model class with common configurations
 * Features:
 * - Paranoid mode enabled (soft deletes)
 * - Timestamps enabled (createdAt, updatedAt)
 * - DeletedAt for soft deletes
 */
class BaseModel extends Model {
  /**
       * Initialize the model with base configuration
       * @param {Object} attributes - Model attributes
       * @param {Object} options - Model options
       * @returns {Model} Initialized model
       */
  static init(attributes, options) {
    return super.init(attributes, {
      ...options,
      timestamps: true,
      paranoid: true,
      underscored: true, // Use snake_case for database columns
    });
  }
}

export default BaseModel;
