import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { RECEIVE_RSS_POSTS, RECEIVE_RSS_FEEDS } from '../constants/action-types';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
  feeds: [],
  moreFeeds: false,
  visibility: {},
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
        moreFeeds: action.payload.more,
        visibility: {
          ...state.visibility,
          ...mapValues(keyBy(action.payload.feeds, 'id'), () => (true)),
        },
      };
    default:
      return state;
  }
}
