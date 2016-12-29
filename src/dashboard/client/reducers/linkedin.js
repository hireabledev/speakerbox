import omit from 'lodash/omit';
import {
  RECEIVE_LINKEDIN_POSTS,
  RECEIVE_LINKEDIN_POST,
  RESET_LINKEDIN_POSTS,
  RECEIVE_LINKEDIN_SCHEDULED_POSTS,
  RECEIVE_LINKEDIN_SCHEDULED_POST,
  RECEIVE_REMOVE_LINKEDIN_SCHEDULED_POST,
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

export default function linkedinPostsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_LINKEDIN_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postsById: mergeKeyById(state.postsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_LINKEDIN_POST:
      return {
        ...state,
        posts: replaceByIdOrAppend(state.posts, action.payload),
        postsById: mergeKeyById(state.postsById, [action.payload]),
      };
    case RESET_LINKEDIN_POSTS:
      return {
        ...state,
        posts: [],
        postsById: {},
      };
    case RECEIVE_LINKEDIN_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: [...state.scheduledPosts, ...action.payload.posts],
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_LINKEDIN_SCHEDULED_POST:
      return {
        ...state,
        scheduledPosts: replaceByIdOrAppend(state.scheduledPosts, action.payload),
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, [action.payload]),
      };
    case RECEIVE_REMOVE_LINKEDIN_SCHEDULED_POST:
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
