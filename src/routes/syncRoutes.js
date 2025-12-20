import config from '#env';
import server from '#server';
import { authMiddleware } from '#middlewares';
import { authRoutes, productRoutes } from '#routes';

const { prefix, version } = config.api;

server.use(`/${prefix}/${version}/auth`, authRoutes);
server.use(`/${prefix}/${version}/products`, authMiddleware, productRoutes);
