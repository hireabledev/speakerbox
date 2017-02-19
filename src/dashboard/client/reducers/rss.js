import omit from 'lodash/omit';
import {
  RECEIVE_RSS_FEEDS,
  RECEIVE_RSS_FEED,
  RECEIVE_REMOVE_RSS_FEED,
} from '../constants/action-types';
import { mergeKeyById, replaceByIdOrAppend } from '../utils/reducers';

const initialState = {
  feeds: [],
  feedsById: {},
  moreFeeds: false,
};

export default function feedsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_RSS_FEEDS:
      return {
        ...state,
        feeds: replaceByIdOrAppend(state.feeds, action.payload.feeds),
        feedsById: mergeKeyById(state.feedsById, action.payload.feeds),
        moreFeeds: action.payload.more,
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
    default:
      return state;
  }
}
