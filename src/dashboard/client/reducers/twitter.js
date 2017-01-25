import omit from 'lodash/omit';
import {
  RECEIVE_TWITTER_POSTS,
  RECEIVE_TWITTER_POST,
  RESET_TWITTER_POSTS,
  RECEIVE_TWITTER_SCHEDULED_POSTS,
  RECEIVE_TWITTER_SCHEDULED_POST,
  RESET_TWITTER_SCHEDULED_POSTS,
  RESET_TWITTER_SCHEDULED_RETWEETS,
  RECEIVE_REMOVE_TWITTER_SCHEDULED_POST,
  RECEIVE_TWITTER_SCHEDULED_RETWEETS,
  RECEIVE_TWITTER_SCHEDULED_RETWEET,
  RECEIVE_REMOVE_TWITTER_SCHEDULED_RETWEET,
} from '../constants/action-types';
import { mergeKeyById, replaceByIdOrAppend } from '../utils/reducers';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
  scheduledPosts: [],
  scheduledPostsById: {},
  moreScheduledPosts: false,
  scheduledRetweets: [],
  scheduledRetweetsById: {},
  moreScheduledRetweets: false,
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
    case RECEIVE_TWITTER_POST:
      return {
        ...state,
        posts: replaceByIdOrAppend(state.posts, action.payload),
        postsById: mergeKeyById(state.postsById, [action.payload]),
      };
    case RESET_TWITTER_POSTS:
      return {
        ...state,
        posts: [],
        postsById: {},
      };
    case RECEIVE_TWITTER_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: [...state.scheduledPosts, ...action.payload.posts],
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, action.payload.posts),
        morePosts: action.payload.more,
      };
    case RECEIVE_TWITTER_SCHEDULED_POST:
      return {
        ...state,
        scheduledPosts: replaceByIdOrAppend(state.scheduledPosts, action.payload),
        scheduledPostsById: mergeKeyById(state.scheduledPostsById, [action.payload]),
      };
    case RESET_TWITTER_SCHEDULED_POSTS:
      return {
        ...state,
        scheduledPosts: [],
        scheduledPostsById: {},
      };
    case RECEIVE_REMOVE_TWITTER_SCHEDULED_POST:
      return {
        ...state,
        scheduledPosts: state.scheduledPosts.filter(scheduledPost => (
          scheduledPost.id !== action.payload.id
        )),
        scheduledPostsById: omit(state.scheduledPostsById, action.payload.id),
      };
    case RECEIVE_TWITTER_SCHEDULED_RETWEETS:
      return {
        ...state,
        scheduledRetweets: [...state.scheduledRetweets, ...action.payload.retweets],
        scheduledRetweetsById: mergeKeyById(state.scheduledRetweetsById, action.payload.retweets),
        moreRetweets: action.payload.more,
      };
    case RECEIVE_TWITTER_SCHEDULED_RETWEET:
      return {
        ...state,
        scheduledRetweets: replaceByIdOrAppend(state.scheduledRetweets, action.payload),
        scheduledRetweetsById: mergeKeyById(state.scheduledRetweetsById, [action.payload]),
      };
    case RESET_TWITTER_SCHEDULED_RETWEETS:
      return {
        ...state,
        scheduledRetweets: [],
        scheduledRetweetsById: {},
      };
    case RECEIVE_REMOVE_TWITTER_SCHEDULED_RETWEET: {
      const targetScheduledRetweet = state.scheduledRetweetsById[action.payload.id];
      const targetPost = state.postsById[targetScheduledRetweet.twitterPostId];
      const replacementPost = { ...targetPost, scheduledRetweet: null };
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
        scheduledRetweets: state.scheduledRetweets.filter(scheduledRetweet => (
          scheduledRetweet.id !== action.payload.id
        )),
        scheduledRetweetsById: omit(state.scheduledRetweetsById, action.payload.id),
      };
    }
    default:
      return state;
  }
}
