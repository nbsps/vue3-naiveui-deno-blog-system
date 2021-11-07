import BARRAGEMODEL from '../models/barrage.ts';
import { Status, Response } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';

export default {
  getAllBarrages: async ({ response }: { response: Response }): asyncVoid => {
    const data = await BARRAGEMODEL.getAll();
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'ALL Barrages Found!',
      data,
      num: data.length,
    };
  },
  createBarrage: async (ctx: any): asyncVoid => {
    if (!ctx.request.hasBody) {
      ctx.throw(Status.BadRequest, 'No data provided!');
    }
    const value = await ctx.request.body().value;

    await BARRAGEMODEL.add({ ...value });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: 'The record was added successfully!',
    };
  },
  updateBarrageById: async (ctx: any): asyncVoid => {
    const isAvailable = await BARRAGEMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No barrage found!');
    }

    const value = await ctx.request.body().value;
    const updatedRows = await BARRAGEMODEL.updateById({
      id: ctx.params.id,
      ...value,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      Status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
  deleteBarrageById: async (ctx: any): asyncVoid => {
    const isAvailable = await BARRAGEMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No barrage to delete!');
    }

    const updatedRows = await BARRAGEMODEL.deleteById({
      id: ctx.params.id,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
};
