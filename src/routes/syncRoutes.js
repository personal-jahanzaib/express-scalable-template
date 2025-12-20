import config from '#env';
import server from '#server';
import { authRoutes } from '#routes';

const { prefix, version } = config.api;

server.use(`/${prefix}/${version}/auth`, authRoutes);
