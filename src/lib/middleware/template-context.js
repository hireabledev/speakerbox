import path from 'path';
import { groupBy, mapValues } from 'lodash';
import { HOST, GA_ID, MIXPANEL_ID, STATIC_URL } from '../config';

const LEADING_DOT_REGEXP = /^\./;

export default function templateContextMiddleware(req, res, next) {
  if (req.method === 'GET' && (req.is('text/*') || !req.get('content-type'))) {
    /* eslint no-param-reassign: 0 */
    res.locals.HOST = HOST;

    if (GA_ID) { res.locals.GA_ID = GA_ID; }
    if (MIXPANEL_ID) { res.locals.MIXPANEL_ID = MIXPANEL_ID; }

    const webpackStats = res.locals.webpackStats.toJson
      ? res.locals.webpackStats.toJson()
      : res.locals.webpackStats;

    res.locals.assets = mapValues(webpackStats.assetsByChunkName, asset => (
      Array.isArray(asset)
        ? groupBy(asset, filePath => path.extname(filePath).replace(LEADING_DOT_REGEXP, ''))
        : { js: [asset] }
    ));

    res.locals.STATIC_URL = STATIC_URL;
  }
  next();
}
