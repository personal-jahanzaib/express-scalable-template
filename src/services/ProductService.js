import { Op } from 'sequelize';
import { Product, ProductCategory } from '#models';
import { SequelizeUtil } from '#utils';
import { sequelize } from '#configs';

class ProductService {
  static async getAllProducts(query) {
    const fieldMap = {
      categoryName: 'category.name',
    };

    const filterConfig = {
      search: { fields: ['name', 'sku', 'category.name'], operator: Op.iLike },
      categoryId: { operator: Op.eq },
      minPrice: { field: 'price', operator: Op.gte, type: 'number' },
      maxPrice: { field: 'price', operator: Op.lte, type: 'number' },
      isActive: { operator: Op.eq, type: 'boolean' },
    };

    // 2. Extract Options using Utilities
    const order = SequelizeUtil.getSortOptions(query, Product, ['imageUrl'], fieldMap);
    const where = SequelizeUtil.getFilterOptions(query, filterConfig);
    const { limit, offset, page } = SequelizeUtil.getPaginationOptions(query);

    const result = await Product.findAndCountAll({
      where,
      attributes: [
        'id', 'name', 'price', 'stockQuantity', 'categoryId', 'sku', 'createdAt',
        [sequelize.col('category.name'), 'categoryName'],
      ],
      include: [
        {
          model: ProductCategory,
          as: 'category',
          attributes: [],
        },
      ],
      order,
      limit,
      offset,
      raw: true,
    });

    return SequelizeUtil.formatPaginatedResponse(result, page, limit);
  }
}

export default ProductService;
