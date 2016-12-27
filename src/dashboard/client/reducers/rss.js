import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  RECEIVE_RSS_POSTS,
  RECEIVE_RSS_FEEDS,
  RECEIVE_RSS_FEED,
  RECEIVE_REMOVE_RSS_FEED,
} from '../constants/action-types';
import { getVisibilityFromQuery } from '../utils';
import { mergeKeyById, replaceByIdOrAppend } from '../utils/reducers';

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
        postsById: mergeKeyById(state.postsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_RSS_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.payload.feeds],
        postsById: mergeKeyById(state.feedsById, action.payload.feeds),
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
    case RECEIVE_RSS_FEED:
      return {
        ...state,
        feeds: replaceByIdOrAppend(state.feeds, action.payload),
        feedsById: mergeKeyById(state.feedsById, [action.payload]),
      };
    case RECEIVE_REMOVE_RSS_FEED:
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed.id !== action.payload.id),
        feedsById: omit(state.feedsById, action.payload.id),
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
