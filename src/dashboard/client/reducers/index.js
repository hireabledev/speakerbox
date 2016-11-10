import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

export default function configureReducer(reducers) {
  return combineReducers({
    routing,
    ...reducers,
  });
}
