import client from '../db/client.ts';

import { TABLES } from '../db/config.ts';
const TABLE = TABLES.ARTICLE;

export default {
  getAll: async (): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE} GROUP BY createdAt desc`);
  },
};
