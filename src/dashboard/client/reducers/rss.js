import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { LOCATION_CHANGE } from 'react-router-redux';
import { RECEIVE_RSS_POSTS, RECEIVE_RSS_FEEDS } from '../constants/action-types';
import { getVisibilityFromQuery } from '../utils';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
  feeds: [],
  feedsById: {},
  moreFeeds: false,
  feedVisibility: {},
};

export default function rssFeedsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_RSS_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postsById: {
          ...state.postsById,
          ...keyBy(action.payload.posts, 'id'),
        },
        morePosts: action.payload.more,
      };
    case RECEIVE_RSS_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.payload.feeds],
        feedsById: {
          ...state.feedsById,
          ...keyBy(action.payload.feeds, 'id'),
        },
        moreFeeds: action.payload.more,
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
        feedVisibility: {
          ...mapValues(state.feedVisibility, () => (!action.payload.query.feeds)),
          ...getVisibilityFromQuery(action.payload.query.feeds),
        },
      };
    default:
      return state;
  }
}
