import { bgRed, cyan, green, white } from '../deps.ts';
import { Request, Response } from '../deps.ts';

const X_RESPONSE_TIME = 'X-Response-Time';

export default {
  logger: async (
    { response, request }: { response: Response; request: Request },
    next: () => Promise<unknown>,
  ): Promise<void> => {
    await next();
    const responseTime = response.headers.get(X_RESPONSE_TIME);
    console.log(
      `${bgRed(white(String(responseTime)))}: ${green(request.method)} ${cyan(
        request.url.pathname,
      )}`,
    );
  },
  responseTime: async (
    { response }: { response: Response },
    next: () => Promise<unknown>,
  ): Promise<void> => {
    const start = Date.now();
    await next();
    const ms: number = Date.now() - start;
    response.headers.set(X_RESPONSE_TIME, `${ms}ms`);
  },
};
