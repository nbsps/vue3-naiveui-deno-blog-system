import { sRequest } from '../index';

export function getAllLinks(): Promise<any> {
  return sRequest.get({
    url: '/api/links',
  });
}

export function createLink(data: any): Promise<any> {
  return sRequest.post({
    url: '/api/link',
    data,
  });
}

export function updateLinkById(id: number, data: any): Promise<any> {
  return sRequest.put({
    url: '/api/link/' + id,
    data: data,
  });
}

export function deleteLinkById(id: number): Promise<any> {
  return sRequest.delete({
    url: '/api/link/' + id,
  });
}
