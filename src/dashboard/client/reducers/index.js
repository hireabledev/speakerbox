import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { reducer as form } from 'redux-form';
import { reducer as notifs } from 'redux-notifications';
import menu from 'lib/client/reducers/menu';
import accounts from './accounts';
import posts from './posts';
import rss from './rss';
import user from './user';
import visibility from './visibility';

export default function configureReducer(reducers) {
  return combineReducers({
    routing,
    loadingBar,
    accounts,
    posts,
    rss,
    user,
    visibility,
    form,
    notifs,
    menu,
    ...reducers,
  });
}
