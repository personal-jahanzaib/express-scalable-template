import config from '#env';
import server from '#server';
import '#syncRoutes';

server.listen(config.server.port, () => {
  console.info(`Server is running on port ${config.server.port}`);
});
