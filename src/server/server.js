import express from 'express';
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

export default server;
