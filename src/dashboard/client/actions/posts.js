import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetch from 'lib/fetch';
import {
  RECEIVE_FACEBOOK_POSTS,
  RECEIVE_TWITTER_POSTS,
  RECEIVE_LINKEDIN_POSTS,
  RECEIVE_RSS_POSTS,
  RECEIVE_FACEBOOK_SCHEDULED_POSTS,
  RECEIVE_TWITTER_SCHEDULED_POSTS,
  RECEIVE_LINKEDIN_SCHEDULED_POSTS,
} from '../constants/action-types';

function getAccountQueryString(accounts = []) {
  return accounts.map(account => `&accountId=${account}`).join('');
}

function getFeedQueryString(feeds = []) {
  return feeds.map(feed => `&rssFeedId=${feed}`);
}

export function receiveFacebookPosts({ posts, more }) {
  return {
    type: RECEIVE_FACEBOOK_POSTS,
    payload: { posts, more },
  };
}

export function receiveTwitterPosts({ posts, more }) {
  return {
    type: RECEIVE_TWITTER_POSTS,
    payload: { posts, more },
  };
}

export function receiveLinkedinPosts({ posts, more }) {
  return {
    type: RECEIVE_LINKEDIN_POSTS,
    payload: { posts, more },
  };
}

export function receiveRSSPosts({ posts, more }) {
  return {
    type: RECEIVE_RSS_POSTS,
    payload: { posts, more },
  };
}

export function receiveFacebookScheduledPosts({ scheduledPosts, more }) {
  return {
    type: RECEIVE_FACEBOOK_SCHEDULED_POSTS,
    payload: { scheduledPosts, more },
  };
}

export function receiveTwitterScheduledPosts({ scheduledPosts, more }) {
  return {
    type: RECEIVE_TWITTER_SCHEDULED_POSTS,
    payload: { scheduledPosts, more },
  };
}

export function receiveLinkedinScheduledPosts({ scheduledPosts, more }) {
  return {
    type: RECEIVE_LINKEDIN_SCHEDULED_POSTS,
    payload: { scheduledPosts, more },
  };
}

export function fetchFacebookPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { facebook } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/facebook/posts?skip=${facebook.posts.length}${accountQueryString}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveFacebookPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchTwitterPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { twitter } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/twitter/posts?skip=${twitter.posts.length}${accountQueryString}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveTwitterPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchLinkedinPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { linkedin } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/linkedin/posts?skip=${linkedin.posts.length}${accountQueryString}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveLinkedinPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchRSSPosts({ feeds }) {
  return async (dispatch, getState) => {
    const { rss } = getState();
    dispatch(showLoading());
    const feedQueryString = getFeedQueryString(feeds);
    const res = await fetch(`/api/rss/posts?skip=${rss.posts.length}${feedQueryString}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveRSSPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchPosts(options = {}) {
  const { accounts, feeds } = options;
  return async (dispatch, getState) => (
    await Promise.resolve([
      fetchFacebookPosts({ accounts })(dispatch, getState),
      fetchTwitterPosts({ accounts })(dispatch, getState),
      fetchLinkedinPosts({ accounts })(dispatch, getState),
      fetchRSSPosts({ feeds })(dispatch, getState),
    ])
  );
}

export function fetchFacebookScheduledPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { facebook } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/facebook/scheduled-posts?skip=${facebook.scheduledPosts.length}${accountQueryString}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveFacebookScheduledPosts({ scheduledPosts: data, more }));
    return { data, more };
  };
}

export function fetchTwitterScheduledPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { twitter } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/twitter/scheduled-posts?skip=${twitter.scheduledPosts.length}${accountQueryString}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveTwitterScheduledPosts({ scheduledPosts: data, more }));
    return { data, more };
  };
}

export function fetchLinkedinScheduledPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { linkedin } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/linkedin/scheduled-posts?skip=${linkedin.scheduledPosts.length}${accountQueryString}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveLinkedinScheduledPosts({ scheduledPosts: data, more }));
    return { data, more };
  };
}

export function fetchScheduledPosts(options = {}) {
  const { accounts } = options;
  return async (dispatch, getState) => (
    await Promise.resolve([
      fetchFacebookScheduledPosts({ accounts })(dispatch, getState),
      fetchTwitterScheduledPosts({ accounts })(dispatch, getState),
      fetchLinkedinScheduledPosts({ accounts })(dispatch, getState),
    ])
  );
}
