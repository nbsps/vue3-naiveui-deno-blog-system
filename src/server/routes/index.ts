import { Router } from '../deps.ts';

const router = new Router();

import articleController from '../controllers/article.ts';
import barrageController from '../controllers/barrage.ts';
import linkController from '../controllers/link.ts';
import photoController from '../controllers/photos.ts';
import categoryController from '../controllers/category.ts';

import authorize from '../middlewares/authorize.ts';

router
  .get('/api/blogs', authorize, articleController.getAllBlogs)
  .get('/api/pblogs', articleController.getBlogs)
  .post('/api/blog', authorize, articleController.createBlog)
  .get('/api/blog/:id', articleController.getBlogById)
  .put('/api/blog/:id', authorize, articleController.updateBlogById)
  .delete('/api/blog/:id', authorize, articleController.deleteBlogById)
  .post('/api/verify/:id', articleController.verifyPassById);

router
  .get('/api/barrages', barrageController.getAllBarrages)
  .post('/api/barrage', barrageController.createBarrage)
  .put('/api/barrage/:id', authorize, barrageController.updateBarrageById)
  .delete('/api/barrage/:id', authorize, barrageController.deleteBarrageById);

router
  .get('/api/links', linkController.getAllLinks)
  .post('/api/link', authorize, linkController.createLink)
  .put('/api/link/:id', authorize, linkController.updateLinkById)
  .delete('/api/link/:id', authorize, linkController.deleteLinkById);

router
  .get('/api/photos', photoController.getAllPhotos)
  .post('/api/photo', authorize, photoController.createPhoto)
  .delete('/api/photo/:id', authorize, photoController.deletePhotoById);

router
  .get('/api/categorys', categoryController.getAllCategorys)
  .get('/api/blog/category/:category', categoryController.getAllByCategory);

export default router;
