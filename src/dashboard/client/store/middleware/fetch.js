import { showLoading, hideLoading } from 'react-redux-loading-bar';

export default function fetchMiddleware() {
  return ({ dispatch }) => next => action => {
    if (action.then) {
      dispatch(showLoading());
      return action
        .then(res => {
          dispatch(hideLoading());
          return res;
        })
        .catch(err => {
          dispatch(hideLoading());
          throw err;
        });
    }
    return next(action);
  };
}
