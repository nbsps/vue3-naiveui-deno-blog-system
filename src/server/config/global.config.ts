import { bcrypt, sha256 } from '../deps.ts';
export default {
  mysql: {
    hostname: Deno.env.get('DB_HOST') ?? '127.0.0.1',
    database: 'blog',
    username: 'root',
    password: 'root',
  },
  admin: {
    username: 'admin',
    nickname: 'Silvensn',
    password: await bcrypt.hash(sha256('123456', 'utf8', 'hex') as string), // 123456
    description: '前端工程师',
    qq: '2467214168',
    email: '2467214168@qq.com',
    github: 'https://github.com/nbsps',
    avatar: 'preset/avatar-my1.png',
    cover: 'preset/cover-my.png',
    about: 'preset/header-my.png',
    motto: '人生如逆旅，我亦是行人。',
    aboutMotto: '人活着就是为了樱岛麻衣！',
  } as { [index: string]: string },
  jwt: {
    expiredIn: 3 * 86400 * 1000, // jwt 三天过期
    secret: await crypto.subtle.generateKey(
      { name: 'HMAC', hash: 'SHA-512' },
      true,
      ['sign', 'verify'],
    ),
  },
};
