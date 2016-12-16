import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import accounts from './accounts';
import facebook from './facebook';
import twitter from './twitter';
import linkedin from './linkedin';
import rss from './rss';

export default function configureReducer(reducers) {
  return combineReducers({
    routing,
    loadingBar,
    accounts,
    facebook,
    twitter,
    linkedin,
    rss,
    ...reducers,
  });
}
