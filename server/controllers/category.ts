import CATEGORYMODEL from '../models/category.ts';
import { Status, Response } from '../deps.ts';
import { asyncVoid } from '../types.d.ts';

export default {
  getAllCategorys: async ({ response }: { response: Response }): asyncVoid => {
    let data = await CATEGORYMODEL.getAll();
    data = data.map((item: any) => item.category);
    console.log(data);
    response.status = Status.OK;
    response.body = {
      status: 'success',
      message: 'ALL Categories Found!',
      data,
      num: data.length,
    };
  },
  getAllByCategory: async (ctx: any): asyncVoid => {
    const blogs = await CATEGORYMODEL.getByCategory(ctx.params.category);
    if (!blogs) {
      ctx.throw(Status.NotFound, `No blog of ${ctx.params.category} found!`);
    }
    ctx.response.status = Status.OK;
    ctx.response.body = {
      status: 'success',
      message: `ALL Blogs of ${ctx.params.category} Found!`,
      blogs,
      num: blogs.length,
    };
  },
};
