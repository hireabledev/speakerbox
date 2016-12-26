import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetch from 'lib/fetch';
import { RECEIVE_ACCOUNTS } from '../constants/action-types';

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
