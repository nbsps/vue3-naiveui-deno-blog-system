import { sRequest } from '../index';

export function LoginRequest(url: string, account: any): Promise<unknown> {
  return sRequest.post({
    url: url,
    data: account,
  });
}
