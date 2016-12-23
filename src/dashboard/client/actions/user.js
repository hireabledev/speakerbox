import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { RECEIVE_USER } from '../constants/action-types';

export function receiveUser({ user }) {
  return {
    type: RECEIVE_USER,
    payload: { user },
  };
}

export function fetchUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    const res = await fetch('/api/users/me', { credentials: 'include' });
    dispatch(hideLoading());
    const { data } = await res.json();
    dispatch(receiveUser(data));
    return data;
  };
}
