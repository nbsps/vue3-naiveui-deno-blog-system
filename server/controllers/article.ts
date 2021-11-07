import ARTICLEMODEL from '../models/article.ts';
import { Status, Response } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';

export default {
  getAllBlogs: async ({ response }: { response: Response }): asyncVoid => {
    const data = await ARTICLEMODEL.getAll();
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'ALL Blogs Found!',
      data,
      num: data.length,
    };
  },
  getBlogs: async ({ response }: { response: Response }): asyncVoid => {
    const data = await ARTICLEMODEL.getPublished();
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'ALL Blogs Found!',
      data,
      num: data.length,
    };
  },
  createBlog: async (ctx: any): asyncVoid => {
    if (!ctx.request.hasBody) {
      ctx.throw(Status.BadRequest, 'No data provided!');
    }
    const value = await ctx.request.body().value;

    await ARTICLEMODEL.add({ ...value });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: 'The record was added successfully!',
    };
  },
  getBlogById: async (ctx: any): asyncVoid => {
    const isAvailable = await ARTICLEMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No blog found!');
    }

    const blog = await ARTICLEMODEL.getById({ id: ctx.params.id });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      data: blog,
    };
  },
  updateBlogById: async (ctx: any): asyncVoid => {
    const isAvailable = await ARTICLEMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No blog found!');
    }

    const value = await ctx.request.body().value;
    const updatedRows = await ARTICLEMODEL.updateById({
      id: ctx.params.id,
      ...value,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      Status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
  deleteBlogById: async (ctx: any): asyncVoid => {
    const isAvailable = await ARTICLEMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No blog to delete!');
    }

    const updatedRows = await ARTICLEMODEL.deleteById({
      id: ctx.params.id,
    });
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: `Successfully updated ${updatedRows} row(s)`,
    };
  },
  verifyPassById: async (ctx: any): asyncVoid => {
    const isAvailable = await ARTICLEMODEL.doesExistById({
      id: ctx.params.id,
    });
    if (!isAvailable) {
      ctx.throw(Status.NotFound, 'No blog found!');
    }

    const value = await ctx.request.body().value;
    const pass = await ARTICLEMODEL.passById(ctx.params.id);
    if (pass[0].password !== value.password) {
      ctx.throw(Status.Forbidden, 'Forbidden!');
    }
    ctx.response.status = 200;
    ctx.response.body = {
      status: 'success',
      message: `Verified!`,
    };
  },
};
