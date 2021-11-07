import client from '../db/client.ts';

import { TABLES } from '../db/config.ts';
const TABLE = TABLES.PHOTOS;

import Photos from '../interface/Photos.ts';

export default {
  doesExistById: async ({ id }: Photos): Promise<boolean> => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE} WHERE id=? LIMIT 1`,
      [id],
    );
    return result.count > 0;
  },
  getAll: async (): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE}`);
  },
  getById: async ({ id }: Photos): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);
  },
  add: async ({ url, isPublish }: Photos): Promise<any> => {
    return await client.query(
      `INSERT INTO ${TABLE}(url, isPublish) values(?, ?)`,
      [url, isPublish],
    );
  },
  updateById: async ({ id, url, isPublish }: Photos): Promise<number> => {
    const result = await client.query(
      `UPDATE ${TABLE} SET url = ?, isPublish = ? WHERE id=?`,
      [url, isPublish, id],
    );
    return result.affectedRows;
  },
  deleteById: async ({ id }: Photos): Promise<number> => {
    const result = await client.query(`DELETE FROM ${TABLE} WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows;
  },
};
