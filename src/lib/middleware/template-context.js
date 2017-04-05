import path from 'path';
import { groupBy, mapValues } from 'lodash';
import {
  ENV,
  HOST,
  GA_ID,
  ADSENSE_ID,
  MIXPANEL_ID,
  PROPELLER_ID,
  PROPELLER_URL,
  STATIC_URL,
  VERSION,
} from '../config';

const LEADING_DOT_REGEXP = /^\./;

function getAssetsFromStats(stats) {
  const webpackStats = stats.toJson ? stats.toJson() : stats;
  return mapValues(webpackStats.assetsByChunkName, chunkAssets => {
    chunkAssets = Array.isArray(chunkAssets) ? chunkAssets : [chunkAssets];
    chunkAssets = chunkAssets.filter(assetName => {
      if (assetName.substr(-4) === '.map') {
        return true;
      }
      return chunkAssets.indexOf(`${assetName}.map`) !== -1;
    });
    return groupBy(chunkAssets, filePath => path.extname(filePath).replace(LEADING_DOT_REGEXP, ''));
  });
}

export default async function templateContextMiddleware(req, res, next) {
  if (req.method === 'GET' && (req.is('text/*') || !req.get('content-type'))) {
    /* eslint no-param-reassign: 0 */
    res.locals.ENV = ENV;
    res.locals.HOST = HOST;
    res.locals.VERSION = VERSION;

    if (GA_ID) { res.locals.GA_ID = GA_ID; }
    if (ADSENSE_ID) { res.locals.ADSENSE_ID = ADSENSE_ID; }
    if (MIXPANEL_ID) { res.locals.MIXPANEL_ID = MIXPANEL_ID; }
    if (PROPELLER_ID) { res.locals.PROPELLER_ID = PROPELLER_ID; }
    if (PROPELLER_URL) { res.locals.PROPELLER_URL = PROPELLER_URL; }
    if (req.user) { res.locals.user = req.user; }

    res.locals.assets = req.app.locals.assets || getAssetsFromStats(res.locals.webpackStats);

    if (ENV === 'production') {
      req.app.locals.assets = res.locals.assets;
    }

    res.locals.STATIC_URL = STATIC_URL;
  }
  next();
}
