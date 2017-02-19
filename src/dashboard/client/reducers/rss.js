import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import {
  RECEIVE_RSS_FEEDS,
  RECEIVE_RSS_FEED,
  RECEIVE_REMOVE_RSS_FEED,
} from '../constants/action-types';
import { mergeKeyById } from '../utils/reducers';

const initialState = {
  feeds: [],
  feedsById: {},
  moreFeeds: false,
};

export default function feedsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_RSS_FEEDS: {
      const feedsById = mergeKeyById(state.feedsById, action.payload.feeds);
      const feeds = orderBy(feedsById, 'created', 'desc');
      return {
        ...state,
        feeds,
        feedsById,
        moreFeeds: action.payload.more,
      };
    }
    case RECEIVE_RSS_FEED: {
      const feedsById = mergeKeyById(state.feedsById, [action.payload]);
      const feeds = orderBy(feedsById, 'created', 'desc');
      return {
        ...state,
        feeds,
        feedsById,
      };
    }
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
