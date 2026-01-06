import { Router } from 'express';
import { ResponseUtil } from '#utils';
import { authMiddleware } from '#middlewares';
import { authRoutes, productRoutes } from '#routes';
import { httpResponse } from '#constants';

const apiRouter = Router();

// Feature routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', authMiddleware, productRoutes);

// 404 handler - ONLY for API routes
apiRouter.use((_, res) => {
  ResponseUtil.error(res, httpResponse.NOT_FOUND.api, httpResponse.NOT_FOUND.code);
});

export default apiRouter;
