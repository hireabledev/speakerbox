import { RECEIVE_TWITTER_POSTS, RECEIVE_TWITTER_SCHEDULED_POSTS } from '../constants/action-types';
import { mergeKeyById } from '../utils/reducers';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
  scheduledPosts: [],
  scheduledPostsById: {},
  moreScheduledPosts: false,
};

export default function twitterPostsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TWITTER_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postsById: mergeKeyById(state.postsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_TWITTER_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: [...state.scheduledPosts, ...action.payload.scheduledPosts],
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, action.payload.scheduledPosts),
        morePosts: action.payload.more,
      };
    default:
      return state;
  }
}
