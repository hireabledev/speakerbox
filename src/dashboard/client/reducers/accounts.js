import omit from 'lodash/omit';
import { RECEIVE_ACCOUNTS, RECEIVE_REMOVE_ACCOUNT } from '../constants/action-types';
import { mergeKeyById, replaceByIdOrAppend } from '../utils/reducers';

const initialState = {
  accounts: [],
  accountsById: {},
  moreAccounts: false,
};

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return {
        ...state,
        accounts: replaceByIdOrAppend(state.accounts, action.payload.accounts),
        accountsById: mergeKeyById(state.accountsById, action.payload.accounts),
        moreAccounts: action.payload.more,
      };
    case RECEIVE_REMOVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(account => account.id !== action.payload.id),
        accountsById: omit(state.accountsById, action.payload.id),
      };
    default:
      return state;
  }
}
