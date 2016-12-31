import pagination from 'express-query-pagination';
import sort from 'express-sequelize-sort';
import configureRouter from '../../router';
import { where, filter, created, attributes } from '../../../lib/middleware/sequelize';
import { upload } from '../../../lib/multer';
import { index, show, create, update, remove } from './controller';

const router = configureRouter();

router.get(
  '/',
  pagination,
  sort,
  where,
  created,
  attributes,
  filter('Account'),
  index
);
router.get('/:id', show);
router.post('/', upload.array('files'), create);
router.put('/:id', upload.array('files'), update);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
