import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  RECEIVE_FACEBOOK_POSTS,
  RECEIVE_TWITTER_POSTS,
  RECEIVE_LINKEDIN_POSTS,
  RECEIVE_RSS_POSTS,
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

export function receiveLinkedInPosts({ posts, more }) {
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

export function fetchFacebookPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { facebook } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/facebook/posts?skip=${facebook.posts.length}${accountQueryString}`, { credentials: 'include' });
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
    const res = await fetch(`/api/twitter/posts?skip=${twitter.posts.length}${accountQueryString}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveTwitterPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchLinkedInPosts({ accounts }) {
  return async (dispatch, getState) => {
    const { linkedin } = getState();
    dispatch(showLoading());
    const accountQueryString = getAccountQueryString(accounts);
    const res = await fetch(`/api/linkedin/posts?skip=${linkedin.posts.length}${accountQueryString}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveLinkedInPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchRSSPosts({ feeds }) {
  return async (dispatch, getState) => {
    const { rss } = getState();
    dispatch(showLoading());
    const feedQueryString = getFeedQueryString(feeds);
    const res = await fetch(`/api/rss/posts?skip=${rss.posts.length}${feedQueryString}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveRSSPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchPosts({ facebookAccounts, twitterAccounts, linkedinAccounts, feeds }) {
  return async (dispatch, getState) => (
    await Promise.resolve([
      fetchFacebookPosts({ accounts: facebookAccounts })(dispatch, getState),
      fetchTwitterPosts({ accounts: twitterAccounts })(dispatch, getState),
      fetchLinkedInPosts({ accounts: linkedinAccounts })(dispatch, getState),
      fetchRSSPosts({ feeds })(dispatch, getState),
    ])
  );
}
