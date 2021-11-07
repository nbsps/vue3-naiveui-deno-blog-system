import client from '../db/client.ts';

import { TABLES } from '../db/config.ts';
const TABLE = TABLES.BARRAGE;

import Barrage from '../interface/Barrage.ts';

export default {
  doesExistById: async ({ id }: Barrage): Promise<boolean> => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE} WHERE id=? LIMIT 1`,
      [id],
    );
    return result.count > 0;
  },
  getAll: async (): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE}`);
  },
  add: async ({ content }: Barrage): Promise<any> => {
    return await client.query(`INSERT INTO ${TABLE}(content) values(?)`, [
      content,
    ]);
  },
  updateById: async ({ id, content }: Barrage): Promise<number> => {
    const result = await client.query(
      `UPDATE ${TABLE} SET content = ? WHERE id=?`,
      [content, id],
    );
    return result.affectedRows;
  },
  deleteById: async ({ id }: Barrage): Promise<number> => {
    const result = await client.query(`DELETE FROM ${TABLE} WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows;
  },
};
