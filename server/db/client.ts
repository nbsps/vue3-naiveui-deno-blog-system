import { Client } from '../deps.ts';

import globalConfig from '../config/global.config.ts';
import { DATABASE } from './config.ts';

const client = await new Client();

client.connect({
  ...globalConfig.mysql,
  poolSize: 10,
  charset: 'utf8mb4',
});

const run = async () => {
  await client.execute(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`);
  await client.execute(`USE ${DATABASE}`);
};

run();

export default client;
