import pickBy from 'lodash/pickBy';
import fetch from 'lib/fetch';
import { notifySuccess, notifyError } from './notifications';
import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RESET_POSTS,
  RECEIVE_SCHEDULED_POSTS,
  RECEIVE_SCHEDULED_POST,
  RESET_SCHEDULED_POSTS,
  RECEIVE_REMOVE_SCHEDULED_POST,
} from '../constants/action-types';

function getVisibilityQueryParams({ accountVisibility, feedVisibility }) {
  const params = {};
  const accountId = Object.keys(pickBy(accountVisibility));
  const feedId = Object.keys(pickBy(feedVisibility));
  const allAccountsEnabled = Object.keys(accountVisibility).length === accountId.length;
  const allFeedsEnabled = Object.keys(accountVisibility).length === accountId.length;
  if (allAccountsEnabled && allFeedsEnabled) {
    return params;
  }
  if (accountId.length) {
    params.accountId = accountId;
  }
  if (feedId.length) {
    params.feedId = feedId;
  }
  return params;
}

export const receivePosts = ({ posts, more }) => ({
  type: RECEIVE_POSTS,
  payload: { posts, more },
});

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  payload: post,
});

export const resetPosts = () => ({
  type: RESET_POSTS,
});

export const fetchPosts = (options = {}) => (
  async (dispatch, getState) => {
    const state = getState();
    try {
      const res = await dispatch(fetch('/api/posts', {
        query: {
          skip: state.posts.posts.length,
          limit: 5,
          ...getVisibilityQueryParams(state.visibility),
          ...options.query,
        },
      }));
      const { data, more } = res.body;
      const posts = data.map(post => {
        post.date = new Date(post.date); // eslint-disable-line no-param-reassign
        return post;
      });
      dispatch(receivePosts({ posts, more }));
      return res.body;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);

export const fetchPost = (id) => (
  async dispatch => {
    try {
      const res = await dispatch(fetch(`/api/posts/${id}`));
      const post = res.body;
      post.date = new Date(post.date);
      dispatch(receivePost(post));
      return post;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);

export const updatePost = (id, body) => (
  async dispatch => {
    try {
      const res = await dispatch(fetch(`/api/posts/${id}`, { method: 'PATCH', body }));
      const post = res.body;
      post.date = new Date(post.date);
      dispatch(receivePost(post));
      dispatch(notifySuccess('Updated Post'));
      return post;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);

export const toggleFavoritePost = (id, favorited) => (
  updatePost(id, { favorited: favorited ? null : new Date() })
);

export const receiveScheduledPosts = ({ scheduledPosts, more }) => ({
  type: RECEIVE_SCHEDULED_POSTS,
  payload: { scheduledPosts, more },
});

export const receiveScheduledPost = (scheduledPost) => ({
  type: RECEIVE_SCHEDULED_POST,
  payload: scheduledPost,
});

export const receiveRemoveScheduledPost = (id) => ({
  type: RECEIVE_REMOVE_SCHEDULED_POST,
  payload: { id },
});

export const resetScheduledPosts = () => ({
  type: RESET_SCHEDULED_POSTS,
});

export const fetchScheduledPosts = (options = {}) => (
  async (dispatch, getState) => {
    const state = getState();
    try {
      const res = await dispatch(fetch('/api/scheduled-posts', {
        query: {
          skip: state.posts.scheduledPosts.length,
          ...getVisibilityQueryParams(state.visibility),
          ...options.query,
        },
      }));
      const { data, more } = res.body;
      const scheduledPosts = data.map(scheduledPost => {
        scheduledPost.date = new Date(scheduledPost.date); // eslint-disable-line no-param-reassign
        return scheduledPost;
      });
      dispatch(receiveScheduledPosts({ scheduledPosts, more }));
      return res.body;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);

export const fetchScheduledPost = (id) => (
  async dispatch => {
    try {
      const res = await dispatch(fetch(`/api/scheduled-posts/${id}`));
      const scheduledPost = res.body;
      scheduledPost.date = new Date(scheduledPost.date);
      dispatch(receiveScheduledPost(scheduledPost));
      return scheduledPost;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);

export const createScheduledPost = (body) => (
  async dispatch => {
    try {
      const res = await dispatch(fetch('/api/scheduled-posts', { method: 'POST', body }));
      const scheduledPost = res.body;
      scheduledPost.date = new Date(scheduledPost.date);
      dispatch(receiveScheduledPost(scheduledPost));
      dispatch(notifySuccess('Scheduled Post'));
      mixpanel.track('Scheduled Post', {
        id: scheduledPost.id,
        account: scheduledPost.accountId,
      });
      if (scheduledPost.postId) {
        scheduledPost.post = await dispatch(fetchPost(scheduledPost.postId));
      }
      return scheduledPost;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);

export const updateScheduledPost = (id, body) => (
  async dispatch => {
    try {
      const res = await dispatch(fetch(`/api/scheduled-posts/${id}`, { method: 'PATCH', body }));
      const scheduledPost = res.body;
      scheduledPost.date = new Date(scheduledPost.date);
      if (scheduledPost.date < new Date()) {
        delete scheduledPost.date;
      }
      dispatch(receiveScheduledPost(scheduledPost));
      dispatch(notifySuccess('Updated Post'));
      mixpanel.track('Updated Scheduled Post', {
        id: scheduledPost.id,
        account: scheduledPost.accountId,
      });
      return scheduledPost;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);

export const removeScheduledPost = (id) => (
  async dispatch => {
    try {
      await dispatch(fetch(`/api/scheduled-posts/${id}`, { method: 'DELETE' }));
      dispatch(receiveRemoveScheduledPost(id));
      dispatch(notifySuccess('Removed Post'));
      mixpanel.track('Removed Scheduled Post', { id });
      return { id };
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  }
);
