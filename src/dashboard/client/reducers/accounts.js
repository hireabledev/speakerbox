import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { RECEIVE_ACCOUNTS } from '../constants/action-types';

const initialState = {
  accounts: [],
  accountsById: {},
  moreAccounts: false,
  visibility: {},
};

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return {
        ...state,
        accounts: [...state.accounts, ...action.payload.accounts],
        accountsById: {
          ...state.accountsById,
          ...keyBy(action.payload.accounts, 'id'),
        },
        moreAccounts: action.payload.more,
        visibility: {
          ...state.visibility,
          ...mapValues(keyBy(action.payload.accounts, 'id'), () => (true)),
        },
      };
    default:
      return state;
  }
}
