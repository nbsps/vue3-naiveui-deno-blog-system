import { sRequest } from '../index';

export function getAllBlogs(): Promise<any> {
  return sRequest.get({
    url: '/api/blogs',
  });
}

export function getBlogs(): Promise<any> {
  return sRequest.get({
    url: '/api/pblogs',
  });
}

export function createBlog(data: number): Promise<any> {
  return sRequest.post({
    url: '/api/blog',
    data,
  });
}

export function getBlogById(id: number): Promise<any> {
  return sRequest.get({
    url: '/api/blog/' + id,
  });
}

export function updateBlogById(id: number, data: any): Promise<any> {
  return sRequest.put({
    url: '/api/blog/' + id,
    data,
  });
}

export function deleteBlogById(id: number): Promise<any> {
  return sRequest.delete({
    url: '/api/blog/' + id,
  });
}

export function verifyPassById(id: number, data: any): Promise<any> {
  return sRequest.post({
    url: '/api/blog/' + id,
    data,
  });
}
