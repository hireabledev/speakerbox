import fetch from 'lib/fetch';
import { notifySuccess, notifyError } from './notifications';
import { RECEIVE_RSS_FEEDS, RECEIVE_RSS_FEED, RECEIVE_REMOVE_RSS_FEED } from '../constants/action-types';

export function receiveFeeds({ feeds, more }) {
  return {
    type: RECEIVE_RSS_FEEDS,
    payload: { feeds, more },
  };
}

export function fetchFeeds() {
  return async (dispatch, getState) => {
    const { rss } = getState();
    try {
      const res = await dispatch(fetch(`/api/rss/feeds?skip=${rss.feeds.length}`));
      const { data, more } = res.body;
      dispatch(receiveFeeds({ feeds: data, more }));
      return res.body;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}

export function receiveFeed(feed) {
  return {
    type: RECEIVE_RSS_FEED,
    payload: feed,
  };
}

export function addFeed(body) {
  return async dispatch => {
    try {
      const res = await dispatch(fetch('/api/rss/feeds', { method: 'POST', body }));
      const feed = res.body;
      dispatch(notifySuccess('Feed Created'));
      dispatch(receiveFeed(feed));
      return feed;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}

export function updateFeed(id, body) {
  return async dispatch => {
    try {
      const res = await dispatch(fetch(`/api/rss/feeds/${id}`, { method: 'PATCH', body }));
      const feed = res.body;
      dispatch(notifySuccess('Feed Updated'));
      dispatch(receiveFeed(feed));
      return feed;
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}

export function receiveRemoveFeed(id) {
  return {
    type: RECEIVE_REMOVE_RSS_FEED,
    payload: { id },
  };
}

export function removeFeed(id) {
  return async dispatch => {
    try {
      await dispatch(fetch(`/api/rss/feeds/${id}`, { method: 'DELETE' }));
      dispatch(notifySuccess('Feed Removed'));
      dispatch(receiveRemoveFeed(id));
      return { id };
    } catch (err) {
      dispatch(notifyError(err));
      throw err;
    }
  };
}
