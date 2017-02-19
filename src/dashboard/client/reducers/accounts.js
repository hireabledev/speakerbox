import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import { RECEIVE_ACCOUNTS, RECEIVE_REMOVE_ACCOUNT } from '../constants/action-types';
import { mergeKeyById } from '../utils/reducers';

const initialState = {
  accounts: [],
  accountsById: {},
  moreAccounts: false,
};

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS: {
      const accountsById = mergeKeyById(state.accountsById, action.payload.accounts);
      const accounts = orderBy(accountsById, 'created', 'desc');
      return {
        ...state,
        accounts,
        accountsById,
        moreAccounts: action.payload.more,
      };
    }
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
