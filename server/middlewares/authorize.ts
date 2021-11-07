import { verify } from '../deps.ts';
import type { Payload } from '../deps.ts';
import type { Next, asyncVoid } from '../types.d.ts';
import config from '../config/global.config.ts';

export default async (ctx: any, next: Next): asyncVoid => {
  const authHeader = ctx.request.headers.get('authorization');

  if (!authHeader) {
    ctx.throw(401, 'Plz Login First!');
  } else {
    const token = authHeader;
    let jwtpayload: any;
    try {
      const key: CryptoKey = config.jwt.secret;

      const payload: Payload = await verify(token, key);

      ctx.request.user = payload;
      jwtpayload = payload;
    } catch (err) {
      ctx.throw(401);
    }
    if (!jwtpayload || jwtpayload.expiredIn < new Date().getTime())
      ctx.throw(401, 'Your Token has expired!');
    await next();
  }
};
