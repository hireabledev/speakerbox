import omit from 'lodash/omit';
import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RESET_POSTS,
  RECEIVE_SCHEDULED_POSTS,
  RECEIVE_SCHEDULED_POST,
  RESET_SCHEDULED_POSTS,
  RECEIVE_REMOVE_SCHEDULED_POST,
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

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: replaceByIdOrAppend(state.posts, action.payload.posts),
        postsById: mergeKeyById(state.postsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_POST:
      return {
        ...state,
        posts: replaceByIdOrAppend(state.posts, action.payload),
        postsById: mergeKeyById(state.postsById, [action.payload]),
      };
    case RESET_POSTS:
      return {
        ...state,
        posts: [],
        postsById: {},
      };
    case RECEIVE_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: replaceByIdOrAppend(state.scheduledPosts, action.payload.scheduledPosts),
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, action.payload.scheduledPosts),
        moreScheduledPosts: action.payload.more,
      };
    case RECEIVE_SCHEDULED_POST:
      return {
        ...state,
        scheduledPosts: replaceByIdOrAppend(state.scheduledPosts, action.payload),
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, [action.payload]),
      };
    case RESET_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: [],
        scheduledPostsById: {},
      };
    case RECEIVE_REMOVE_SCHEDULED_POST: {
      const targetScheduledPost = state.scheduledPostsById[action.payload.id];
      const targetPost = state.postsById[targetScheduledPost.postId];
      const replacementPost = { ...targetPost, scheduledPost: null };
      return {
        ...state,
        posts: state.posts.map(post => {
          if (targetPost && post.id === targetPost.id) {
            return replacementPost;
          }
          return post;
        }),
        postsById: {
          ...state.postsById,
          ...(targetPost ? { [targetPost.id]: replacementPost } : {}),
        },
        scheduledPosts: state.scheduledPosts.filter(scheduledPost => (
          scheduledPost.id !== action.payload.id
        )),
        scheduledPostsById: omit(state.scheduledPostsById, action.payload.id),
      };
    }
    default:
      return state;
  }
}
