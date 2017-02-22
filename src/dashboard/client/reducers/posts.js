import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RESET_POSTS,
  RECEIVE_SCHEDULED_POSTS,
  RECEIVE_SCHEDULED_POST,
  RESET_SCHEDULED_POSTS,
  RECEIVE_REMOVE_SCHEDULED_POST,
} from '../constants/action-types';
import { mergeKeyById } from '../utils/reducers';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: true,
  scheduledPosts: [],
  scheduledPostsById: {},
  moreScheduledPosts: true,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const postsById = mergeKeyById(state.postsById, action.payload.posts);
      const posts = orderBy(postsById, 'date', 'desc');
      return {
        ...state,
        posts,
        postsById,
        morePosts: action.payload.more,
      };
    }
    case RECEIVE_POST: {
      const postsById = mergeKeyById(state.postsById, [action.payload]);
      const posts = orderBy(postsById, 'date', 'desc');
      return {
        ...state,
        posts,
        postsById,
      };
    }
    case RESET_POSTS:
      return {
        ...state,
        posts: [],
        postsById: {},
        morePosts: true,
      };
    case RECEIVE_SCHEDULED_POSTS: {
      const scheduledPostsById = mergeKeyById(
        state.scheduledPostsById,
        action.payload.scheduledPosts
      );
      const scheduledPosts = orderBy(scheduledPostsById, 'date', 'desc');
      return {
        ...state,
        scheduledPosts,
        scheduledPostsById,
        moreScheduledPosts: action.payload.more,
      };
    }
    case RECEIVE_SCHEDULED_POST: {
      const scheduledPostsById = mergeKeyById(state.scheduledPostsById, [action.payload]);
      const scheduledPosts = orderBy(scheduledPostsById, 'date', 'desc');
      return {
        ...state,
        scheduledPosts,
        scheduledPostsById,
      };
    }
    case RESET_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: [],
        scheduledPostsById: {},
        moreScheduledPosts: true,
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
