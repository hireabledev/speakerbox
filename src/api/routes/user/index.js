import pagination from 'express-query-pagination';
import sort from 'express-sequelize-sort';
import configureRouter from '../../router';
import { adminOnly } from '../../../lib/middleware/access-control';
import { where, created, attributes } from '../../../lib/middleware/sequelize';
import { index, show, create, update, remove } from './controller';

const router = configureRouter();

router.get(
  '/',
  adminOnly,
  pagination,
  sort,
  where,
  created,
  attributes,
  index
);
router.get('/:id', show);
router.post('/', adminOnly, create);
router.put('/:id', update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
