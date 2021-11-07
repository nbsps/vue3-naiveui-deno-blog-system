import { Status, Response, bcrypt } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';
import config from '../config/global.config.ts';

export default {
  getinfo: async ({ response }: { response: Response }): asyncVoid => {
    const { username, password, ...data } = config.admin;
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'ALL info loaded!',
      data,
    };
  },
  updateinfo: async (ctx: any): asyncVoid => {
    const value = await ctx.request.body().value;
    if (!value.key || !value.value)
      ctx.throw(Status.BadRequest, 'Plz give all data!');
    if (!(value.key in config.admin))
      ctx.throw(Status.BadRequest, 'Plz give correct data!');
    if ((value.key as string) === 'password')
      value.value = await bcrypt.hash(value.value as string);
    config.admin[value.key as string] = value.value as string;
    ctx.response.status = Status.OK;
    ctx.response.body = {
      Status: 'success',
      message: 'Blog info updated!',
    };
  },
};
