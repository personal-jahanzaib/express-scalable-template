import '#syncRoutes';
import config from '#env';
import server from '#server';
import { Logger } from '#utils';


const logger = Logger;
logger.setContext('Application');

logger.info(`Environment: ${config.server.environment.toUpperCase()}`);
logger.info('Loading routes and middleware...');

server.listen(config.server.port, () => {
  logger.success(`Server is running on port ${config.server.port}`);
  logger.info(`API Base URL: /${config.api.prefix}/${config.api.version}`);
  logger.log('All routes registered successfully');
  logger.verbose('Server initialization complete');
  logger.success('Ready to accept connections');
});
