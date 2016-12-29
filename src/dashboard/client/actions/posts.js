import fetch from 'lib/fetch';
import { notifySuccess, notifyError } from './notifications';
import * as actions from '../constants/action-types';

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

  const fetchPosts = () => (
    async (dispatch, getState) => {
      const state = getState()[type];
      try {
        const res = await dispatch(fetch(`/api/${type}/posts?skip=${state.posts.length}`));
        const { data, more } = res.body;
        dispatch(receivePosts({ posts: data, more }));
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
        const res = await dispatch(fetch(`/api/${type}/posts/${id}`));
        const post = res.body;
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
        const res = await dispatch(fetch(`/api/facebook/posts/${id}`, { method: 'PATCH', body }));
        const post = res.body;
        dispatch(receivePost(post));
        dispatch(notifySuccess('Updated Post'));
        return post;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const favoritePost = (id) => (
    updatePost(id, { favorited: new Date() })
  );

  return {
    receivePosts,
    receivePost,
    fetchPosts,
    fetchPost,
    updatePost,
    favoritePost,
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

  const fetchScheduledPosts = () => (
    async (dispatch, getState) => {
      const state = getState()[type];
      try {
        const res = await dispatch(fetch(`/api/${type}/scheduled-posts?skip=${state.scheduledPosts.length}`));
        const { data, more } = res.body;
        dispatch(receiveScheduledPosts({ posts: data, more }));
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
        const res = await dispatch(fetch(`/api/${type}/scheduled-posts/${id}`));
        const post = res.body;
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
        const res = await dispatch(fetch('/api/facebook/scheduled-posts', { method: 'POST', body }));
        const post = res.body;
        dispatch(receiveScheduledPost(post));
        dispatch(notifySuccess('Scheduled Post'));
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
        const res = await dispatch(fetch(`/api/facebook/scheduled-posts/${id}`, { method: 'PATCH', body }));
        const post = res.body;
        dispatch(receiveScheduledPost(post));
        dispatch(notifySuccess('Updated Post'));
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
        await dispatch(fetch(`/api/facebook/scheduled-posts/${id}`, { method: 'DELETE' }));
        dispatch(receiveRemoveScheduledPost(id));
        dispatch(notifySuccess('Removed Post'));
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
    fetchScheduledPosts,
    fetchScheduledPost,
    createScheduledPost,
    updateScheduledPost,
    removeScheduledPost,
  };
}

export const facebook = {
  ...postActions('facebook'),
  ...scheduledPostActions('facebook'),
};

export const twitter = {
  ...postActions('twitter'),
  ...scheduledPostActions('twitter'),
};

export const linkedin = {
  ...postActions('linkedin'),
  ...scheduledPostActions('linkedin'),
};

export const rss = postActions('rss');

export function fetchAllPosts() {
  return async (dispatch, getState) => (
    await Promise.resolve([
      facebook.fetchPosts()(dispatch, getState),
      twitter.fetchPosts()(dispatch, getState),
      linkedin.fetchPosts()(dispatch, getState),
      rss.fetchPosts()(dispatch, getState),
    ])
  );
}

export function fetchAllScheduledPosts() {
  return async (dispatch, getState) => (
    await Promise.resolve([
      facebook.fetchScheduledPosts()(dispatch, getState),
      twitter.fetchScheduledPosts()(dispatch, getState),
      linkedin.fetchScheduledPosts()(dispatch, getState),
    ])
  );
}
