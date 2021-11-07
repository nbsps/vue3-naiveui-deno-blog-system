import { Router } from '../deps.ts';
import login from '../controllers/login.ts';
import authorize from '../middlewares/authorize.ts';

const router = new Router();

router
  .post('/api/login', login.login)
  .post('/api/verify', authorize, login.verify);

export default router;
