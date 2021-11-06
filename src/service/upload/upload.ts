import { sRequest } from '../index';

export function upload(data: any): Promise<any> {
  return sRequest.post({
    url: '/api/upload',
    data,
  });
}
