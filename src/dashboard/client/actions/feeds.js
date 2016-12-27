import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetch from 'lib/fetch';
import { notify } from './notifications';
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
    dispatch(showLoading());
    try {
      const res = await fetch(`/api/rss/feeds?skip=${rss.feeds.length}`);
      const { data, more } = await res.json();
      dispatch(receiveFeeds({ feeds: data, more }));
      return { data, more };
    } catch (err) {
      dispatch(notify({
        message: err.message,
        kind: 'danger',
      }));
      return err;
    } finally {
      dispatch(hideLoading());
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
    dispatch(showLoading());
    try {
      const feed = await fetch('/api/rss/feeds', {
        method: 'POST',
        body,
      });
      dispatch(notify({
        message: 'Feed Created',
        kind: 'success',
      }));
      dispatch(receiveFeed(feed));
      return feed;
    } catch (err) {
      dispatch(notify({
        message: err.message,
        kind: 'danger',
      }));
      return err;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function updateFeed(id, body) {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const feed = await fetch(`/api/rss/feeds/${id}`, {
        method: 'PATCH',
        body,
      });
      dispatch(notify({
        message: 'Feed Updated',
        kind: 'success',
      }));
      dispatch(receiveFeed(feed));
      return feed;
    } catch (err) {
      dispatch(notify({
        message: err.message,
        kind: 'danger',
      }));
      return err;
    } finally {
      dispatch(hideLoading());
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
    dispatch(showLoading());
    try {
      await fetch(`/api/rss/feeds/${id}`, { method: 'DELETE' });
      dispatch(notify({
        message: 'Feed Removed',
        kind: 'success',
      }));
      dispatch(receiveRemoveFeed(id));
      return { id };
    } catch (err) {
      dispatch(notify({
        message: err.message,
        kind: 'danger',
      }));
      return err;
    } finally {
      dispatch(hideLoading());
    }
  };
}
