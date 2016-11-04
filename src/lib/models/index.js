import path from 'path';
import globby from 'globby';
import { capitalize, camelCase } from 'lodash';
import sequelize, { Sequelize } from '../sequelize';

globby.sync([
  path.join(__dirname, '*.model.js'),
])
  .forEach(filePath => {
    /* eslint global-require: 0, 'import/newline-after-import': 0, 'import/no-dynamic-require': 0 */
    const model = require(filePath.replace(/\.js$/, '')).default;
    require('./relations');
    exports[capitalize(camelCase(model.name))] = model;
  });

exports.sequelize = sequelize;
exports.Sequelize = Sequelize;
