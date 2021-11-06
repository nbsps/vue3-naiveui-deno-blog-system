import config from '../config/global.config.ts';
import { create, bcrypt, Status } from '../deps.ts';
import type { Header, Payload } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';

export default {
  login: async (ctx: any): asyncVoid => {
    const value = await ctx.request.body().value;

    if (
      value.username === config.admin.nickname &&
      (await bcrypt.compare(value.password, config.admin.password))
    ) {
      const header: Header = { alg: 'HS512', typ: 'JWT' };
      const payload: Payload = {
        username: config.admin.username,
        expiredIn: new Date().getTime() + config.jwt.expiredIn,
      };
      const key: CryptoKey = config.jwt.secret;

      const token = await create(header, payload, key);
      ctx.response.status = Status.OK;
      ctx.response.body = {
        status: 'success',
        message: `Logged in with ${config.admin.username}`,
        data: { accessToken: token, expiredIn: config.jwt.expiredIn },
      };
    } else {
      ctx.throw(Status.Unauthorized, 'Wrong Password!');
    }
  },
  verify: async (ctx: any): asyncVoid => {
    const header: Header = { alg: 'HS512', typ: 'JWT' };
    const payload: Payload = {
      username: config.admin.username,
      expiredIn: new Date().getTime() + config.jwt.expiredIn,
    };
    const key: CryptoKey = config.jwt.secret;

    const token = await create(header, payload, key);
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: `Token updated!`,
      data: { accessToken: token, expiredIn: config.jwt.expiredIn },
    };
  },
};
