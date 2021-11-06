import LINKMODEL from '../models/link.ts';
import { Status, Response } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';

export default {
  getAllLinks: async ({ response }: { response: Response }): asyncVoid => {
    const data = await LINKMODEL.getAll();
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'ALL Links Found!',
      data,
      num: data.length,
    };
  },
  createLink: async (ctx: any): asyncVoid => {
    if (!ctx.request.hasBody) {
      ctx.throw(Status.BadRequest, 'No data provided!');
    }
    const value = await ctx.request.body().value;

    await LINKMODEL.add({ ...value });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: 'The record was added successfully!',
    };
  },
  updateLinkById: async (ctx: any): asyncVoid => {
    const isAvailable = await LINKMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No link found!');
    }

    const value = await ctx.request.body().value;
    const updatedRows = await LINKMODEL.updateById({
      id: ctx.params.id,
      ...value,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      Status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
  deleteLinkById: async (ctx: any): asyncVoid => {
    const isAvailable = await LINKMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No link to delete!');
    }

    const updatedRows = await LINKMODEL.deleteById({
      id: ctx.params.id,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
};
