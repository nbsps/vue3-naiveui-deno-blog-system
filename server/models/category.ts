import client from '../db/client.ts';

import { TABLES } from '../db/config.ts';
const TABLE = TABLES.ARTICLE;

export default {
  getAll: async (): Promise<any> => {
    return await client.query(`SELECT distinct category FROM ${TABLE}`);
  },
  getByCategory: async (category: string): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE} WHERE category = ?`, [
      category,
    ]);
  },
};
