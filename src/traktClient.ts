import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { logger } from './logger';

dotenv.config();

const baseUrl = 'https://api.trakt.tv/users/mrdth/history/movies/';

// load the last watched date from the lastWtchedTime file, and append it to the URL
let lastWatchedTime = '';

export const traktClient = async () => {
  if (!process.env.TRAKT_CLIENT_ID) {
    throw new Error('TRAKT_CLIENT_ID is not defined');
  }

try {

  lastWatchedTime =  fs.readFileSync('./lastWatchedTime', 'utf8');
} catch (err) {
  logger.error('Error reading lastWatchedTime file', err);
}
const url = lastWatchedTime !== '' ? `${baseUrl}?start_at=${lastWatchedTime}` : baseUrl;

logger.info(`URL: ${url}`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': process.env.TRAKT_CLIENT_ID,
    },
  });

  return response.json();
};