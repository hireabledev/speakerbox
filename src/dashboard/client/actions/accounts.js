import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetch from 'lib/fetch';
import { RECEIVE_ACCOUNTS, RECEIVE_REMOVE_ACCOUNT } from '../constants/action-types';
import { notify } from './notifications';

export function receiveAccounts({ accounts, more }) {
  return {
    type: RECEIVE_ACCOUNTS,
    payload: { accounts, more },
  };
}

export function fetchAccounts() {
  return async (dispatch, getState) => {
    const { accounts } = getState();
    dispatch(showLoading());
    const res = await fetch(`/api/accounts?skip=${accounts.accounts.length}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveAccounts({ accounts: data, more }));
    return { data, more };
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
    dispatch(showLoading());
    await fetch(`/api/accounts/${id}`, { method: 'DELETE' });
    dispatch(hideLoading());
    dispatch(notify({
      message: 'Account Removed',
      kind: 'success',
    }));
    dispatch(receiveRemoveAccount(id));
    return { id };
  };
}
