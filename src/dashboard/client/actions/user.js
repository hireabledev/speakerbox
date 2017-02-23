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
      const user = res.body;
      dispatch(receiveUser(user));
      mixpanel.identify(user.id);
      mixpanel.people.set({
        $name: user.name,
        $created: user.created,
        $email: user.email,
        tel: user.tel,
      });
      mixpanel.track('User Load');
      return user;
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
      const user = res.body;
      dispatch(notifySuccess('Saved User Details'));
      dispatch(receiveUser(user));
      mixpanel.people.set({
        $name: user.name,
        $created: user.created,
        $email: user.email,
        tel: user.tel,
      });
      return res.body;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}
