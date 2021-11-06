import PHOTOSMODEL from '../models/photos.ts';
import { Status, Response } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';

export default {
  getAllPhotos: async ({ response }: { response: Response }): asyncVoid => {
    const data = await PHOTOSMODEL.getAll();
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'ALL Photos Found!',
      data,
      num: data.length,
    };
  },
  createPhoto: async (ctx: any): asyncVoid => {
    if (!ctx.request.hasBody) {
      ctx.throw(Status.BadRequest, 'No data provided!');
    }
    const value = await ctx.request.body().value;

    const result = await PHOTOSMODEL.add({ ...value });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: 'The record was added successfully!',
      data: { id: result.lastInsertId },
    };
  },
  getPhotoById: async (ctx: any): asyncVoid => {
    const isAvailable = await PHOTOSMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No photo found!');
    }

    const photo = await PHOTOSMODEL.getById({ id: ctx.params.id });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      data: photo,
    };
  },
  updatePhotoById: async (ctx: any): asyncVoid => {
    const isAvailable = await PHOTOSMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No photo found!');
    }

    const value = await ctx.request.body().value;
    const updatedRows = await PHOTOSMODEL.updateById({
      id: ctx.params.id,
      ...value,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      Status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
  deletePhotoById: async (ctx: any): asyncVoid => {
    const isAvailable = await PHOTOSMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No photo to delete!');
    }

    const updatedRows = await PHOTOSMODEL.deleteById({
      id: ctx.params.id,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
};
