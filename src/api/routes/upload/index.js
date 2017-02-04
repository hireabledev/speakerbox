import { upload } from 'lib/multer';
import configureRouter from '../../router';
import { listMiddleware, filter } from '../../middleware';
import { index, show, create, update, remove } from './controller';

const MODEL_NAME = 'Upload';
const router = configureRouter();

router.get(
  '/',
  ...listMiddleware,
  filter(MODEL_NAME),
  index
);
router.get('/:id', show);
router.post('/', upload.array('files'), create);
router.put('/:id', upload.array('files'), update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
