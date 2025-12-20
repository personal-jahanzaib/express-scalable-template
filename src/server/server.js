import express from 'express';
import { requestLogger } from '#middlewares';

const server = express();


server.use(express.json());
server.use(requestLogger);

export default server;
