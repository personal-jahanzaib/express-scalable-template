import { ProductService } from '#services';
import { AsyncUtil, ResponseUtil } from '#utils';

class ProductController {
  static getAll = AsyncUtil.asyncHandler(async (req, res) => {
    const products = await ProductService.getAllProducts(req.query);
    ResponseUtil.success(
      res,
      products,
    );
  });
}

export default ProductController;
