import { Router } from '../deps.ts';
import { upload } from '../middlewares/upload.ts';
import authorize from '../middlewares/authorize.ts';
const router = new Router();

router.post(
  '/api/upload',
  authorize,
  upload('public/uploads', {
    extensions: ['jpg', 'png'],
    maxSizeBytes: 20000000,
    maxFileSizeBytes: 10000000,
  }),
  (context: any) => {
    context.response.status = 200;
    context.response.body = {
      success: true,
      message: 'upload success!',
      data: context.uploadedFiles,
    };
  },
);

export default router;
