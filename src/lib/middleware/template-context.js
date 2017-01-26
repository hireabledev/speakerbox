import path from 'path';
import { groupBy, mapValues } from 'lodash';
import { HOST, GA_ID, ADSENSE_ID, MIXPANEL_ID, STATIC_URL } from '../config';

const LEADING_DOT_REGEXP = /^\./;

export default function templateContextMiddleware(req, res, next) {
  if (req.method === 'GET' && (req.is('text/*') || !req.get('content-type'))) {
    /* eslint no-param-reassign: 0 */
    res.locals.HOST = HOST;

    if (GA_ID) { res.locals.GA_ID = GA_ID; }
    if (ADSENSE_ID) { res.locals.ADSENSE_ID = ADSENSE_ID; }
    if (MIXPANEL_ID) { res.locals.MIXPANEL_ID = MIXPANEL_ID; }
    if (req.user) { res.locals.user = req.user; }

    const webpackStats = res.locals.webpackStats.toJson
      ? res.locals.webpackStats.toJson()
      : res.locals.webpackStats;

    res.locals.assets = mapValues(webpackStats.assetsByChunkName, chunkAssets => {
      chunkAssets = Array.isArray(chunkAssets) ? chunkAssets : [chunkAssets];
      chunkAssets = chunkAssets.filter(assetName => {
        if (assetName.substr(-4) === '.map') {
          return true;
        }
        return chunkAssets.indexOf(`${assetName}.map`) !== -1;
      });
      return groupBy(chunkAssets, filePath => path.extname(filePath).replace(LEADING_DOT_REGEXP, ''));
    });

    res.locals.STATIC_URL = STATIC_URL;
  }
  next();
}
