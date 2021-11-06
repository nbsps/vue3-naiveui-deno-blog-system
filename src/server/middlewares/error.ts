import { isHttpError, Status } from '../deps.ts';

const between = (value: number, start: number, end: number) =>
  value >= start && value < end;

export default async (
  ctx: any,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    await next();

    // route path NotFound
    const status = ctx.response.status || Status.NotFound;

    if (status === Status.NotFound) {
      ctx.throw(Status.NotFound, 'Not Found!');
    }
  } catch (err) {
    if (isHttpError(err)) {
      const status = err.status;

      ctx.response.status = status;
      ctx.response.body = {
        status: between(status, 400, 500) ? 'fail' : 'error',
        message: err.message,
      };
    } else {
      console.log(err);
      ctx.response.status = 500;
      ctx.response.body = {
        status: 'error',
        message: 'Server Error!',
      };
    }
  }
};
