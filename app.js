import config from '#env';
import server from '#server';
import '#syncRoutes';

server.listen(config.server.port, () => {
  // eslint-disable-next-line no-console
  console.info(`Server is running on port ${config.server.port}`);
});
