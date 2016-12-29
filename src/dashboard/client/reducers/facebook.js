import omit from 'lodash/omit';
import {
  RECEIVE_FACEBOOK_POSTS,
  RECEIVE_FACEBOOK_POST,
  RESET_FACEBOOK_POSTS,
  RECEIVE_FACEBOOK_SCHEDULED_POSTS,
  RECEIVE_FACEBOOK_SCHEDULED_POST,
  RECEIVE_REMOVE_FACEBOOK_SCHEDULED_POST,
} from '../constants/action-types';
import { mergeKeyById, replaceByIdOrAppend } from '../utils/reducers';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
  scheduledPosts: [],
  scheduledPostsById: {},
  moreScheduledPosts: false,
};

export default function facebookPostsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FACEBOOK_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postsById: mergeKeyById(state.postsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_FACEBOOK_POST:
      return {
        ...state,
        posts: replaceByIdOrAppend(state.posts, action.payload),
        postsById: mergeKeyById(state.postsById, [action.payload]),
      };
    case RESET_FACEBOOK_POSTS:
      return {
        ...state,
        posts: [],
        postsById: {},
      };
    case RECEIVE_FACEBOOK_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: [...state.scheduledPosts, ...action.payload.scheduledPosts],
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, action.payload.scheduledPosts),
        morePosts: action.payload.more,
      };
    case RECEIVE_FACEBOOK_SCHEDULED_POST:
      return {
        ...state,
        scheduledPosts: replaceByIdOrAppend(state.scheduledPosts, action.payload),
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, [action.payload]),
      };
    case RECEIVE_REMOVE_FACEBOOK_SCHEDULED_POST:
      return {
        ...state,
        scheduledPosts: state.scheduledPosts.filter(scheduledPost => (
          scheduledPost.id !== action.payload.id
        )),
        scheduledPostsById: omit(state.scheduledPostsById, action.payload.id),
      };
    default:
      return state;
  }
}
