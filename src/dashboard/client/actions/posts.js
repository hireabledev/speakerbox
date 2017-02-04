import fetch from 'lib/fetch';
import { notifySuccess, notifyError } from './notifications';
import * as actions from '../constants/action-types';

export const facebook = {};
export const twitter = {};
export const linkedin = {};

export function postActions(type) {
  const TYPE = type.toUpperCase();

  const receivePosts = ({ posts, more }) => ({
    type: actions[`RECEIVE_${TYPE}_POSTS`],
    payload: { posts, more },
  });

  const receivePost = (post) => ({
    type: actions[`RECEIVE_${TYPE}_POST`],
    payload: post,
  });

  const resetPosts = () => ({
    type: actions[`RESET_${TYPE}_POSTS`],
  });

  const fetchPosts = (options = {}) => (
    async (dispatch, getState) => {
      const state = getState()[type];
      try {
        const res = await dispatch(fetch('/api/posts', {
          query: {
            skip: state.posts.length,
            limit: 5,
            type,
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

  const fetchPost = (id) => (
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

  const updatePost = (id, body) => (
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

  const toggleFavoritePost = (id, favorited) => (
    updatePost(id, { favorited: favorited ? null : new Date() })
  );

  return {
    receivePosts,
    receivePost,
    resetPosts,
    fetchPosts,
    fetchPost,
    updatePost,
    toggleFavoritePost,
  };
}

export function scheduledPostActions(type) {
  const TYPE = type.toUpperCase();

  const receiveScheduledPosts = ({ posts, more }) => ({
    type: actions[`RECEIVE_${TYPE}_SCHEDULED_POSTS`],
    payload: { posts, more },
  });

  const receiveScheduledPost = (post) => ({
    type: actions[`RECEIVE_${TYPE}_SCHEDULED_POST`],
    payload: post,
  });

  const receiveRemoveScheduledPost = (id) => ({
    type: actions[`RECEIVE_REMOVE_${TYPE}_SCHEDULED_POST`],
    payload: { id },
  });

  const resetScheduledPosts = () => ({
    type: actions[`RESET_${TYPE}_SCHEDULED_POSTS`],
  });

  const fetchScheduledPosts = (options = {}) => (
    async (dispatch, getState) => {
      const state = getState()[type];
      try {
        const res = await dispatch(fetch('/api/scheduled-posts', {
          query: {
            skip: state.scheduledPosts.length,
            type,
            ...options.query,
          },
        }));
        const { data, more } = res.body;
        const posts = data.map(post => {
          post.date = new Date(post.date); // eslint-disable-line no-param-reassign
          return post;
        });
        dispatch(receiveScheduledPosts({ posts, more }));
        return res.body;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const fetchScheduledPost = (id) => (
    async dispatch => {
      try {
        const res = await dispatch(fetch(`/api/scheduled-posts/${id}`));
        const post = res.body;
        post.date = new Date(post.date);
        dispatch(receiveScheduledPost(post));
        return post;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const createScheduledPost = (body) => (
    async dispatch => {
      try {
        const res = await dispatch(fetch('/api/scheduled-posts', { method: 'POST', body }));
        const post = res.body;
        post.date = new Date(post.date);
        dispatch(receiveScheduledPost(post));
        dispatch(notifySuccess('Scheduled Post'));
        mixpanel.track('Scheduled Post', {
          type,
          id: post.id,
          account: post.accountId,
        });
        if (type === 'twitter' && post.postId) {
          post.post = await dispatch(twitter.fetchPost(post.postId));
        }
        return post;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const updateScheduledPost = (id, body) => (
    async dispatch => {
      try {
        const res = await dispatch(fetch(`/api/scheduled-posts/${id}`, { method: 'PATCH', body }));
        const post = res.body;
        post.date = new Date(post.date);
        dispatch(receiveScheduledPost(post));
        dispatch(notifySuccess('Updated Post'));
        mixpanel.track('Updated Scheduled Post', {
          type,
          id: post.id,
          account: post.accountId,
        });
        return post;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const removeScheduledPost = (id) => (
    async dispatch => {
      try {
        await dispatch(fetch(`/api/scheduled-posts/${id}`, { method: 'DELETE' }));
        dispatch(receiveRemoveScheduledPost(id));
        dispatch(notifySuccess('Removed Post'));
        mixpanel.track('Removed Scheduled Post', { type, id });
        return { id };
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  return {
    receiveScheduledPosts,
    receiveScheduledPost,
    receiveRemoveScheduledPost,
    resetScheduledPosts,
    fetchScheduledPosts,
    fetchScheduledPost,
    createScheduledPost,
    updateScheduledPost,
    removeScheduledPost,
  };
}

Object.assign(
  facebook,
  postActions('facebook'),
  scheduledPostActions('facebook')
);

Object.assign(
  twitter,
  postActions('twitter'),
  scheduledPostActions('twitter'),
);

Object.assign(
  linkedin,
  postActions('linkedin'),
  scheduledPostActions('linkedin')
);

export const rss = postActions('rss');

export function fetchAllPosts(options) {
  return async (dispatch, getState) => (
    await Promise.resolve([
      facebook.fetchPosts(options)(dispatch, getState),
      twitter.fetchPosts(options)(dispatch, getState),
      linkedin.fetchPosts(options)(dispatch, getState),
      rss.fetchPosts(options)(dispatch, getState),
    ])
  );
}

export function fetchAllScheduledPosts(options) {
  return async (dispatch, getState) => (
    await Promise.resolve([
      facebook.fetchScheduledPosts(options)(dispatch, getState),
      twitter.fetchScheduledPosts(options)(dispatch, getState),
      linkedin.fetchScheduledPosts(options)(dispatch, getState),
    ])
  );
}

export function resetAllPosts() {
  return dispatch => {
    dispatch(facebook.resetPosts());
    dispatch(twitter.resetPosts());
    dispatch(linkedin.resetPosts());
    dispatch(rss.resetPosts());
  };
}

export function resetAllScheduledPosts() {
  return dispatch => {
    dispatch(facebook.resetScheduledPosts());
    dispatch(twitter.resetScheduledPosts());
    dispatch(linkedin.resetScheduledPosts());
  };
}
