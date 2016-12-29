import pagination from 'express-query-pagination';
import sort from 'express-sequelize-sort';
import configureRouter from '../../router';
import { where, filter, created, attributes } from '../../../lib/middleware/sequelize';
import { favorited } from '../../middleware/post';
import { index, show, update, remove } from './controller';

const router = configureRouter();

router.get(
  '/',
  pagination,
  sort,
  favorited,
  where,
  created,
  attributes,
  filter('LinkedinPost'),
  index
);
router.get('/:id', show);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
