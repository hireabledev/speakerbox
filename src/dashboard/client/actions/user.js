import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetch from 'lib/fetch';
import { RECEIVE_USER } from '../constants/action-types';
import { notify } from './notifications';

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    payload: { user },
  };
}

export function fetchUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    const res = await fetch('/api/users/me');
    dispatch(hideLoading());
    const user = await res.json();
    dispatch(receiveUser(user));
    return user;
  };
}

export function updateUser(id, values) {
  return async (dispatch) => {
    dispatch(showLoading());
    const res = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      body: values,
    });
    dispatch(hideLoading());
    dispatch(notify({
      message: 'Saved User Details',
      kind: 'success',
    }));
    const user = await res.json();
    dispatch(receiveUser(user));
    return user;
  };
}
