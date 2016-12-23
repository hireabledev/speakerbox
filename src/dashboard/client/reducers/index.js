import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import accounts from './accounts';
import facebook from './facebook';
import linkedin from './linkedin';
import twitter from './twitter';
import rss from './rss';
import user from './user';

export default function configureReducer(reducers) {
  return combineReducers({
    routing,
    loadingBar,
    accounts,
    facebook,
    twitter,
    linkedin,
    rss,
    user,
    ...reducers,
  });
}
