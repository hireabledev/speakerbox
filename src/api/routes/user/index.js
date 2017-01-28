import { adminOnly } from 'lib/middleware/access-control';
import configureRouter from '../../router';
import { listMiddleware } from '../../middleware';
import { index, show, create, update, remove } from './controller';

const router = configureRouter();

router.get(
  '/',
  adminOnly,
  ...listMiddleware,
  index
);
router.get('/:id', show);
router.post('/', adminOnly, create);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
