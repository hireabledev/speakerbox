import path from 'path';
import nunjucks from 'nunjucks';
import { IS_DEV } from './config';

export default function configureNunjucks(app, dir) {
  /* eslint "no-param-reassign": 0 */
  app.locals.APP_DIR = path.basename(dir);
  return nunjucks.configure([
    `${dir}/views`,
    'src/lib/views',
  ], {
    autoescape: true,
    noCache: IS_DEV,
    express: app,
  });
}
