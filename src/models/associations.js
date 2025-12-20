// ============================================================================
// MODEL ASSOCIATIONS
// ============================================================================
// Logic for initializing associations between models.
//
// ⚠️ CIRCULAR DEPENDENCY PREVENTION:
// This file is the central hub for associations. By passing the `models` object
// to each model's `associate` method, we ensure that models can reference each
// other without performing cross-imports in their individual files, which
// prevents "undefined" or "circular import" errors during startup.

let isInitialized = false;

/**
 * Initialize all model associations
 * @param {Object} models - Object containing all initialized models
 * @returns {void}
 */
const initAssociations = (models) => {
    if (isInitialized) {
        return;
    }

    Object.values(models).forEach((model) => {
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });

    isInitialized = true;
};

export default initAssociations;
