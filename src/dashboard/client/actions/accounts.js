import fetch from 'lib/fetch';
import { notifySuccess, notifyError } from './notifications';
import { RECEIVE_ACCOUNTS, RECEIVE_REMOVE_ACCOUNT } from '../constants/action-types';

export function receiveAccounts({ accounts, more }) {
  return {
    type: RECEIVE_ACCOUNTS,
    payload: { accounts, more },
  };
}

export function fetchAccounts() {
  return async (dispatch, getState) => {
    const { accounts } = getState();
    try {
      const res = await dispatch(fetch(`/api/accounts?skip=${accounts.accounts.length}`));
      const { data, more } = res.body;
      dispatch(receiveAccounts({ accounts: data, more }));
      return res.body;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}

export function receiveRemoveAccount(id) {
  return {
    type: RECEIVE_REMOVE_ACCOUNT,
    payload: { id },
  };
}

export function removeAccount(id) {
  return async dispatch => {
    try {
      await dispatch(fetch(`/api/accounts/${id}`, { method: 'DELETE' }));
      dispatch(receiveRemoveAccount(id));
      dispatch(notifySuccess('Account Removed'));
      return { id };
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}
