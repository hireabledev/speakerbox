import pagination from 'express-query-pagination';
import sort from 'express-sequelize-sort';
import configureRouter from '../../router';
import { where, filter, created, attributes } from '../../../lib/middleware/sequelize';
import { index, show, update, remove, retweet, removeRetweet } from './controller';

const router = configureRouter();

router.get(
  '/',
  pagination,
  sort,
  where,
  created,
  attributes,
  filter('TwitterPost'),
  index
);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/:id/retweet', retweet);
router.put('/:id/retweet', retweet);
router.delete('/:id/retweet', removeRetweet);

export default router;
