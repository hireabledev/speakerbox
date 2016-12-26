import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetch from 'lib/fetch';
import { RECEIVE_RSS_FEEDS } from '../constants/action-types';

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
    const res = await fetch(`/api/rss/feeds?skip=${rss.feeds.length}`);
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receiveFeeds({ feeds: data, more }));
    return { data, more };
  };
}
