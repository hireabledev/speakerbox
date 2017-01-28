import configureRouter from '../../router';
import { listMiddleware, filter } from '../../middleware';
import { index, show, update, remove } from './controller';

const MODEL_NAME = 'Account';
const router = configureRouter();

router.get(
  '/',
  ...listMiddleware,
  filter(MODEL_NAME),
  index
);
router.get('/:id', show);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
