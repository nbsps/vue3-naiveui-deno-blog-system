import { Router } from '../deps.ts';
import info from '../controllers/info.ts';
import authorize from '../middlewares/authorize.ts';

const router = new Router();

router
  .get('/api/info', info.getinfo)
  .post('/api/info', authorize, info.updateinfo);

export default router;
