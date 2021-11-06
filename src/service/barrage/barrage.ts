import { sRequest } from '../index';

export function getAllBarrages(): Promise<any> {
  return sRequest.get({
    url: '/api/barrages',
  });
}

export function createBarrage(data: any): Promise<any> {
  return sRequest.post({
    url: '/api/barrage',
    data,
  });
}

export function updateBarrageById(id: number, data: any): Promise<any> {
  return sRequest.put({
    url: '/api/barrage/' + id,
    data: data,
  });
}

export function deleteBarrageById(id: number): Promise<any> {
  return sRequest.delete({
    url: '/api/barrage/' + id,
  });
}
