import client from '../db/client.ts';

import { TABLES } from '../db/config.ts';
const TABLE = TABLES.ARTICLE;

import Article from '../interface/Article.ts';

export default {
  doesExistById: async ({ id }: Article): Promise<boolean> => {
    const [result] = await client.query(
      `SELECT COUNT(*) count FROM ${TABLE} WHERE id=? LIMIT 1`,
      [id],
    );
    return result.count > 0;
  },
  getAll: async (): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE}`);
  },
  getPublished: async (): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE} WHERE isPublish=1`);
  },
  getById: async ({ id }: Article): Promise<any> => {
    return await client.query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);
  },
  add: async ({
    title,
    content,
    cover,
    thumbnail,
    status,
    isPublish,
    password,
    views,
    category,
  }: Article): Promise<any> => {
    return await client.query(
      `INSERT INTO ${TABLE}(
        title,
        content,
        cover,
        thumbnail,
        status,
        isPublish,
        password,
        views,
        category) values(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        content,
        cover,
        thumbnail,
        status,
        isPublish,
        password,
        views,
        category,
      ],
    );
  },
  updateById: async ({
    id,
    title,
    content,
    cover,
    thumbnail,
    status,
    isPublish,
    password,
    views,
    category,
  }: Article): Promise<number> => {
    const result = await client.query(
      `UPDATE ${TABLE} SET
      title = ?,
      content = ?,
      cover = ?,
      thumbnail = ?,
      status = ?,
      isPublish = ?,
      password =? ,
      views = ?,
      category = ? WHERE id=?`,
      [
        title,
        content,
        cover,
        thumbnail,
        status,
        isPublish,
        password,
        views,
        category,
        id,
      ],
    );
    return result.affectedRows;
  },
  deleteById: async ({ id }: Article): Promise<number> => {
    const result = await client.query(`DELETE FROM ${TABLE} WHERE id = ?`, [
      id,
    ]);
    return result.affectedRows;
  },
  passById: async ({ id }: Article): Promise<any> => {
    return await client.query(`SELECT password FROM ${TABLE} WHERE id = ?`, [
      id,
    ]);
  },
};
