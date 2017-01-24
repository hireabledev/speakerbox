import pagination from 'express-query-pagination';
import sort from 'express-sequelize-sort';
import configureRouter from '../../router';
import { where, filter, created, attributes } from '../../../lib/middleware/sequelize';
import { index, show, create, update, remove } from './controller';

const MODEL_NAME = 'TwitterScheduledRetweet';
const router = configureRouter();

router.get(
  '/',
  pagination,
  sort,
  where,
  created,
  attributes,
  filter(MODEL_NAME),
  index
);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
