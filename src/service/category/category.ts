import { sRequest } from '../index';

export function getAllCategorys(): Promise<any> {
  return sRequest.get({
    url: '/api/categorys',
  });
}
