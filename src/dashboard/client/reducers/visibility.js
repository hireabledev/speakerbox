import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { LOCATION_CHANGE } from 'react-router-redux';
import { RECEIVE_ACCOUNTS, RECEIVE_RSS_FEEDS } from '../constants/action-types';
import { getVisibilityFromQuery } from '../utils';

const initialState = {
  accountVisibility: {},
  feedVisibility: {},
};

export default function visibilityReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return {
        ...state,
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
    case RECEIVE_RSS_FEEDS:
      return {
        ...state,
        feedVisibility: {
          ...state.feedVisibility,
          ...mapValues(
            keyBy(action.payload.feeds, 'id'),
            (value, key) => {
              const currentValue = state.feedVisibility[key];
              if (typeof currentValue !== 'undefined') {
                return currentValue;
              }
              return Object.keys(state.feedVisibility).length === 0;
            },
          ),
        },
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        accountVisibility: {
          ...mapValues(state.accountVisibility, () => (!action.payload.query.accounts)),
          ...getVisibilityFromQuery(action.payload.query.accounts),
        },
        feedVisibility: {
          ...mapValues(state.feedVisibility, () => (!action.payload.query.feeds)),
          ...getVisibilityFromQuery(action.payload.query.feeds),
        },
      };
    default:
      return state;
  }
}
