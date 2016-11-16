import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function receiveFacebookPosts({ posts, more }) {
  return {
    type: 'RECEIVE_FACEBOOK_POSTS',
    payload: { posts, more },
  };
}

export function receiveTwitterPosts({ posts, more }) {
  return {
    type: 'RECEIVE_TWITTER_POSTS',
    payload: { posts, more },
  };
}

export function receiveLinkedInPosts({ posts, more }) {
  return {
    type: 'RECEIVE_LINKEDIN_POSTS',
    payload: { posts, more },
  };
}

export function receiveRSSPosts({ posts, more }) {
  return {
    type: 'RECEIVE_RSS_POSTS',
    payload: { posts, more },
  };
}

export function fetchFacebookPosts() {
  return async (dispatch, getState) => {
    const { facebook } = getState();
    dispatch(showLoading());
    const res = await fetch(`/api/accounts/facebook/posts?skip=${facebook.posts.length}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveFacebookPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchTwitterPosts() {
  return async (dispatch, getState) => {
    const { twitter } = getState();
    dispatch(showLoading());
    const res = await fetch(`/api/accounts/twitter/posts?skip=${twitter.posts.length}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveTwitterPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchLinkedInPosts() {
  return async (dispatch, getState) => {
    const { linkedin } = getState();
    dispatch(showLoading());
    const res = await fetch(`/api/accounts/linkedin/posts?skip=${linkedin.posts.length}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveLinkedInPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchRSSPosts() {
  return async (dispatch, getState) => {
    const { rss } = getState();
    dispatch(showLoading());
    const res = await fetch(`/api/feeds/posts?skip=${rss.posts.length}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveRSSPosts({ posts: data, more }));
    return { data, more };
  };
}

export function fetchPosts() {
  return async (dispatch, getState) => (
    await Promise.resolve([
      fetchFacebookPosts()(dispatch, getState),
      fetchTwitterPosts()(dispatch, getState),
      fetchLinkedInPosts()(dispatch, getState),
      fetchRSSPosts()(dispatch, getState),
    ])
  );
}
