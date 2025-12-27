import { Op } from 'sequelize';

class SequelizeUtil {
  static getSortOptions(query, model, excludeFields = ['id', 'imageUrl', 'avatar'], fieldMap = {}) {
    // 1. Ensure we are working with strings to prevent crashes if user sends multiple query params
    let rawSortBy = Array.isArray(query.sortBy) ? query.sortBy[0] : query.sortBy;
    rawSortBy = rawSortBy || 'createdAt';

    let rawSortOrder = Array.isArray(query.sortOrder) ? query.sortOrder[0] : query.sortOrder;
    rawSortOrder = (rawSortOrder || 'DESC').toUpperCase();
    const validOrder = ['ASC', 'DESC'].includes(rawSortOrder) ? rawSortOrder : 'DESC';

    // 2. Translate frontend key to database path if mapping exists
    // Case-insensitive check for fieldMap
    const mappedKey = Object.keys(fieldMap)
      .find((k) => k.toLowerCase() === rawSortBy.toLowerCase());
    if (mappedKey) {
      rawSortBy = fieldMap[mappedKey];
    }

    // 3. Handle nested sorting (e.g., category.name)
    if (rawSortBy.includes('.')) {
      const [associationAlias, column] = rawSortBy.split('.');

      // Case-insensitive lookup for association alias
      const actualAssociationAlias = Object.keys(model.associations)
        .find((k) => k.toLowerCase() === associationAlias.toLowerCase());

      const association = actualAssociationAlias
        ? model.associations[actualAssociationAlias] : null;

      // Only allow sorting on single-row associations (BelongsTo or HasOne)
      if (association && (association.associationType === 'BelongsTo' || association.associationType === 'HasOne')) {
        // Case-insensitive check for association columns
        const actualColumn = Object.keys(association.target.rawAttributes)
          .find((k) => k.toLowerCase() === column.toLowerCase());

        if (actualColumn && !excludeFields.includes(actualColumn)) {
          return [[actualAssociationAlias, actualColumn, validOrder]];
        }
      }
      return [['createdAt', validOrder]];
    }

    // 4. Standard top-level sorting
    // Case-insensitive check for top-level columns
    const actualSortBy = Object.keys(model.rawAttributes)
      .find((k) => k.toLowerCase() === rawSortBy.toLowerCase());

    const isValidColumn = actualSortBy && !excludeFields.includes(actualSortBy);
    const sortBy = isValidColumn ? actualSortBy : 'createdAt';

    return [[sortBy, validOrder]];
  }

  static getPaginationOptions(query, defaultLimit = 10) {
    const rawPage = parseInt(query.page, 10);
    const page = !Number.isNaN(rawPage) ? Math.max(1, rawPage) : 1;

    const rawLimit = parseInt(query.limit, 10);
    const limit = (typeof query.limit !== 'undefined' && !Number.isNaN(rawLimit))
      ? Math.max(1, rawLimit)
      : defaultLimit;

    const offset = (page - 1) * limit;

    return { limit, offset, page };
  }


  static formatPaginatedResponse(result, page, limit) {
    const { count: totalItems, rows: items } = result;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  static getFilterOptions(query, filterConfig = {}) {
    const where = {};

    Object.entries(filterConfig).forEach(([key, config]) => {
      const value = query[key];

      // Skip if value is missing, null, or empty string
      if (value === null || value === '' || typeof value === 'undefined') { return; }

      const {
        field = key,
        operator = Op.eq,
        type,
        fields,
      } = config;

      // Helper to format field name (handle nested association fields)
      const formatField = (f) => (f.includes('.') && !f.startsWith('$') ? `$${f}$` : f);

      // Handle multi-field search (OR)
      if (fields && Array.isArray(fields)) {
        // Skip if fields array is empty
        if (fields.length === 0) {
          return;
        }

        const orConditions = fields.map((f) => ({
          [formatField(f)]: { [operator]: `%${value}%` },
        }));

        if (where[Op.or]) {
          where[Op.or] = [...where[Op.or], ...orConditions];
        } else {
          where[Op.or] = orConditions;
        }
        return;
      }

      // Handle data type conversion
      let processedValue = value;
      if (type === 'boolean') { processedValue = value === 'true'; }
      if (type === 'number') { processedValue = Number(value); }

      // Handle LIKE patterns
      const finalValue = (operator === Op.like || operator === Op.iLike)
        ? `%${processedValue}%`
        : processedValue;

      const finalField = formatField(field);

      // Build or append to the where clause for this field
      if (where[finalField]) {
        Object.assign(where[finalField], { [operator]: finalValue });
      } else {
        where[finalField] = { [operator]: finalValue };
      }
    });

    return where;
  }
}

export default SequelizeUtil;
