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

  const resetPosts = () => ({
    type: actions[`RESET_${TYPE}_POSTS`],
  });

  const fetchPosts = (options = {}) => (
    async (dispatch, getState) => {
      const state = getState()[type];
      try {
        const res = await dispatch(fetch(`/api/${type}/posts`, {
          query: {
            skip: state.posts.length,
            ...options.query,
          },
        }));
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
        const res = await dispatch(fetch(`/api/${type}/posts/${id}`, { method: 'PATCH', body }));
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
        const res = await dispatch(fetch(`/api/${type}/scheduled-posts`, { method: 'POST', body }));
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
        const res = await dispatch(fetch(`/api/${type}/scheduled-posts/${id}`, { method: 'PATCH', body }));
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
        await dispatch(fetch(`/api/${type}/scheduled-posts/${id}`, { method: 'DELETE' }));
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

export function scheduledRetweetActions() {
  const receiveScheduledRetweets = ({ retweets, more }) => ({
    type: actions.RECEIVE_TWITTER_SCHEDULED_RETWEETS,
    payload: { retweets, more },
  });

  const receiveScheduledRetweet = (retweet) => ({
    type: actions.RECEIVE_TWITTER_SCHEDULED_RETWEET,
    payload: retweet,
  });

  const receiveRemoveScheduledRetweet = (id) => ({
    type: actions.RECEIVE_REMOVE_TWITTER_SCHEDULED_RETWEET,
    payload: { id },
  });

  const fetchScheduledRetweets = () => (
    async (dispatch, getState) => {
      const state = getState().twitter;
      try {
        const res = await dispatch(fetch(`/api/twitter/scheduled-retweets?skip=${state.scheduledRetweets.length}`));
        const { data, more } = res.body;
        dispatch(receiveScheduledRetweets({ retweets: data, more }));
        return res.body;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const fetchScheduledRetweet = (id) => (
    async dispatch => {
      try {
        const res = await dispatch(fetch(`/api/twitter/scheduled-retweets/${id}`));
        const retweet = res.body;
        dispatch(receiveScheduledRetweet(retweet));
        return retweet;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const createScheduledRetweet = (body) => (
    async dispatch => {
      try {
        const res = await dispatch(fetch('/api/twitter/scheduled-retweets', { method: 'POST', body }));
        const retweet = res.body;
        dispatch(receiveScheduledRetweet(retweet));
        dispatch(notifySuccess('Scheduled Retweet'));
        return retweet;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const updateScheduledRetweet = (id, body) => (
    async dispatch => {
      try {
        const res = await dispatch(fetch(`/api/twitter/scheduled-retweets/${id}`, { method: 'PATCH', body }));
        const retweet = res.body;
        dispatch(receiveScheduledRetweet(retweet));
        dispatch(notifySuccess('Updated Retweet'));
        return retweet;
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  const removeScheduledRetweet = (id) => (
    async dispatch => {
      try {
        await dispatch(fetch(`/api/twitter/scheduled-retweets/${id}`, { method: 'DELETE' }));
        dispatch(receiveRemoveScheduledRetweet(id));
        dispatch(notifySuccess('Removed Retweet'));
        return { id };
      } catch (err) {
        dispatch(notifyError(err));
        throw err;
      }
    }
  );

  return {
    receiveScheduledRetweets,
    receiveScheduledRetweet,
    receiveRemoveScheduledRetweet,
    fetchScheduledRetweets,
    fetchScheduledRetweet,
    createScheduledRetweet,
    updateScheduledRetweet,
    removeScheduledRetweet,
  };
}

export const facebook = {
  ...postActions('facebook'),
  ...scheduledPostActions('facebook'),
};

export const twitter = {
  ...postActions('twitter'),
  ...scheduledPostActions('twitter'),
  ...scheduledRetweetActions(),
};

export const linkedin = {
  ...postActions('linkedin'),
  ...scheduledPostActions('linkedin'),
};

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

export function fetchAllScheduledPosts() {
  return async (dispatch, getState) => (
    await Promise.resolve([
      facebook.fetchScheduledPosts()(dispatch, getState),
      twitter.fetchScheduledPosts()(dispatch, getState),
      twitter.fetchScheduledRetweets()(dispatch, getState),
      linkedin.fetchScheduledPosts()(dispatch, getState),
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
