import express from 'express';
import config from '#env';
import apiRouter from '#syncRoutes';
import { ResponseUtil } from '#utils';
import { httpResponse } from '#constants';

import {
  helmet,
  compression,
  requestLogger,
  corsMiddleware,
  rateLimitMiddleware,
} from '#middlewares';

const server = express();

server.use(helmet());
server.use(corsMiddleware);
server.use(rateLimitMiddleware);
server.use(compression());
server.use(express.json());
server.use(requestLogger);

// Root health check
server.get('/ping', (_, res) => {
  ResponseUtil.success(res, null, 'pong');
});

// Mount API router
const { prefix, version } = config.api;
server.use(`/${prefix}/${version}`, apiRouter);

// Global 404 handler (must be last)
server.use((_, res) => {
  ResponseUtil.error(res, httpResponse.NOT_FOUND.routes, httpResponse.NOT_FOUND.code);
});

export default server;
