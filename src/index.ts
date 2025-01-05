import { logger } from './logger';
import { traktClient } from './traktClient';

logger.info('Hello, world!');

traktClient().then((data) => {
    if (data.length === 0) {
        logger.info('No new movies watched');
        return;
    }
  logger.info(JSON.stringify(data, null, 2));
});