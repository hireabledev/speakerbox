import fetch from 'lib/fetch';
import { RECEIVE_USER } from '../constants/action-types';
import { notifySuccess, notifyError } from './notifications';

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    payload: { user },
  };
}

export function fetchUser() {
  return async (dispatch) => {
    try {
      const res = await dispatch(fetch('/api/users/me'));
      dispatch(receiveUser(res.body));
      return res.body;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}

export function updateUser(id, values) {
  return async (dispatch) => {
    try {
      const res = await dispatch(fetch(`/api/users/${id}`, { method: 'PATCH', body: values }));
      dispatch(notifySuccess('Saved User Details'));
      dispatch(receiveUser(res.body));
      return res.body;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}
