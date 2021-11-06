import { sRequest } from '../index';

export function BaseInfo(): Promise<any> {
  return sRequest.get({
    url: '/api/info',
  });
}

export function setBaseInfo(data: any): Promise<any> {
  return sRequest.post({
    url: '/api/info',
    data: data,
  });
}
