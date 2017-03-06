import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { reducer as form } from 'redux-form';
import { reducer as notifs } from 'redux-notifications';
import menu from 'lib/client/reducers/menu';

export default function configureReducer(reducers) {
  return combineReducers({
    routing,
    loadingBar,
    form,
    notifs,
    menu,
    ...reducers,
  });
}
