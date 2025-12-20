import { Router } from 'express';
import { ProductController } from '#controllers';

const productRoutes = Router();

productRoutes.get('/all', ProductController.getAll);

export default productRoutes;
