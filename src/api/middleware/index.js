import sort from 'express-sequelize-sort';
import pagination from 'express-query-pagination';
import { where, created, attributes } from 'lib/middleware/sequelize';

export const listMiddleware = [
  pagination,
  sort,
  where,
  created,
  attributes,
];

export { filter } from 'lib/middleware/sequelize';
