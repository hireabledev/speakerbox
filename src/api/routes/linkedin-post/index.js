import pagination from 'express-query-pagination';
import sort from 'express-sequelize-sort';
import configureRouter from '../../router';
import { where, filter, created, attributes } from '../../../lib/middleware/sequelize';
import { index, show, update, remove, share, removeShare } from './controller';

const router = configureRouter();

router.get(
  '/',
  pagination,
  sort,
  where,
  created,
  attributes,
  filter('LinkedInPost'),
  index
);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/:id/share', share);
router.put('/:id/share', share);
router.delete('/:id/share', removeShare);

export default router;
