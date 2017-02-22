import configureRouter from '../../router';
import { listMiddleware, filter } from '../../middleware';
import { favorited, posted, accountsOrFeeds } from '../../middleware/post';
import { index, show, update, remove } from './controller';

const MODEL_NAME = 'Post';
const router = configureRouter();

router.get(
  '/',
  ...listMiddleware,
  favorited,
  posted,
  accountsOrFeeds,
  filter(MODEL_NAME),
  index
);
router.get('/:id', show);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
