import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import { LOCATION_CHANGE } from 'react-router-redux';
import { RECEIVE_ACCOUNTS, RECEIVE_REMOVE_ACCOUNT } from '../constants/action-types';
import { getVisibilityFromQuery } from '../utils';

const initialState = {
  accounts: [],
  accountsById: {},
  moreAccounts: false,
  accountVisibility: {},
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
        accountVisibility: {
          ...state.accountVisibility,
          ...mapValues(
            keyBy(action.payload.accounts, 'id'),
            (value, key) => {
              const currentValue = state.accountVisibility[key];
              if (typeof currentValue !== 'undefined') {
                return currentValue;
              }
              return Object.keys(state.accountVisibility).length === 0;
            },
          ),
        },
      };
    case RECEIVE_REMOVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(account => account.id !== action.payload.id),
        accountsById: omit(state.accountsById, action.payload.id),
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        accountVisibility: {
          ...mapValues(state.accountVisibility, () => (!action.payload.query.accounts)),
          ...getVisibilityFromQuery(action.payload.query.accounts),
        },
      };
    default:
      return state;
  }
}
