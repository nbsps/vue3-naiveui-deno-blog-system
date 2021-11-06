import { Application, send } from './deps.ts';
import { green, yellow } from './deps.ts';
import { Next } from './types.d.ts';

const app = new Application();
const port = +(Deno.env.get('PORT') ?? 16666);

import blogRouter from './routes/index.ts';
import loginRouter from './routes/auth.ts';
import uploadRouter from './routes/upload.ts';
import infoRouter from './routes/info.ts';
import logger from './middlewares/logger.ts';
import error from './middlewares/error.ts';

app.use(async (ctx: any, next: Next) => {
  ctx.response.headers.set(
    'Access-Control-Allow-Origin',
    Deno.env.get('ALLOW_ORIGIN') ?? '*',
  );
  ctx.response.headers.set('Access-Control-Allow-Headers', '*');
  ctx.response.headers.set('Access-Control-Allow-Methods', '*');
  await next();
});
app.use(error);
app.use(logger.logger);
app.use(logger.responseTime);

app.use(blogRouter.routes());
app.use(blogRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());
app.use(uploadRouter.routes());
app.use(uploadRouter.allowedMethods());
app.use(infoRouter.routes());
app.use(infoRouter.allowedMethods());
app.use(async (context) => {
  try {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
      index: 'index.html',
    });
  } catch (err) {
    await send(context, '/index.html', {
      root: `${Deno.cwd()}/public`,
    });
  }
});

app.addEventListener('listen', ({ secure, hostname, port }) => {
  const protocol = secure ? 'https://' : 'http://';
  const url = `${protocol}${hostname}:${port}`;
  console.log(`${yellow('Listening on:')} ${green(url)}`);
});

await app.listen({ port });
