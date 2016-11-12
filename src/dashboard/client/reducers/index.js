import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import posts from './posts';

export default function configureReducer(reducers) {
  return combineReducers({
    routing,
    posts,
    loadingBar,
    ...reducers,
  });
}
