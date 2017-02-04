import omit from 'lodash/omit';
import {
  RECEIVE_RSS_POSTS,
  RECEIVE_RSS_POST,
  RESET_RSS_POSTS,
  RECEIVE_RSS_FEEDS,
  RECEIVE_RSS_FEED,
  RECEIVE_REMOVE_RSS_FEED,
} from '../constants/action-types';
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

export default function feedsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_RSS_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postsById: mergeKeyById(state.postsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_RSS_POST:
      return {
        ...state,
        posts: replaceByIdOrAppend(state.posts, action.payload),
        postsById: mergeKeyById(state.postsById, [action.payload]),
      };
    case RESET_RSS_POSTS:
      return {
        ...state,
        posts: [],
        postsById: {},
      };
    case RECEIVE_RSS_FEEDS:
      return {
        ...state,
        feeds: [...state.feeds, ...action.payload.feeds],
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
