import { sRequest } from '../index';

export function getAllPhotos(): Promise<any> {
  return sRequest.get({
    url: '/api/photos',
  });
}

export function createPhoto(data: any): Promise<any> {
  return sRequest.post({
    url: '/api/photo',
    data,
  });
}
export function deletePhotoById(id: number): Promise<any> {
  return sRequest.delete({
    url: '/api/photo/' + id,
  });
}
