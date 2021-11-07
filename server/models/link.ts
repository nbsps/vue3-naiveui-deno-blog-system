import client from '../db/client.ts';

import { TABLES } from '../db/config.ts';
const TABLE = TABLES.LINK;

import Link from '../interface/Link.ts';

export default {
  doesExistById: async ({ id }: Link): Promise<boolean> => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE} WHERE id=? LIMIT 1`,
      [id],
    );
    return result.count > 0;
  },
  getAll: async (): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE}`);
  },
  add: async ({ avatar, title, motto, isPublish }: Link): Promise<any> => {
    return await client.query(
      `INSERT INTO ${TABLE}(avatar, title, motto, isPublish) values(?, ?, ?, ?)`,
      [avatar, title, motto, isPublish],
    );
  },
  updateById: async ({
    id,
    avatar,
    title,
    motto,
    isPublish,
  }: Link): Promise<number> => {
    const result = await client.query(
      `UPDATE ${TABLE} SET avatar = ?, title = ?, motto = ?, isPublish = ? WHERE id=?`,
      [avatar, title, motto, isPublish, id],
    );
    return result.affectedRows;
  },
  deleteById: async ({ id }: Link): Promise<number> => {
    const result = await client.query(`DELETE FROM ${TABLE} WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows;
  },
};
