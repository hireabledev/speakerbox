import { expect } from 'chai';
import reducer from './rss';
import {
  RECEIVE_RSS_POSTS,
  RECEIVE_RSS_POST,
  RESET_RSS_POSTS,
  RECEIVE_RSS_FEEDS,
  RECEIVE_RSS_FEED,
  RECEIVE_REMOVE_RSS_FEED,
} from '../constants/action-types';

describe('rss reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  const a1 = { id: 'a1' };
  const a2 = { id: 'a2' };
  const a3 = { id: 'a3' };

  it('should have initial state', () => {
    expect(initialState).to.have.all.keys([
      'posts',
      'postsById',
      'morePosts',
      'feeds',
      'feedsById',
      'moreFeeds',
    ]);
  });

  describe('rss feeds', () => {
    it('should receive rss feeds', () => {
      const action = {
        type: RECEIVE_RSS_FEEDS,
        payload: {
          feeds: [a1, a2],
        },
      };

      const state = reducer(initialState, action);

      expect(state.feeds).to.have.length(2);
      expect(state.feedsById.a1).to.equal(a1);
      expect(state.feedsById.a2).to.equal(a2);
    });

    it('should replace rss feed', () => {
      initialState = {
        feeds: [a1, a2],
        feedsById: {
          [a1.id]: a1,
          [a2.id]: a2,
        },
      };

      const a2Alt = {
        id: 'a2',
        alt: true,
      };

      const action = {
        type: RECEIVE_RSS_FEED,
        payload: a2Alt,
      };

      const state = reducer(initialState, action);

      expect(state.feeds).to.have.length(2);
      expect(state.feedsById.a2).to.equal(a2Alt);
    });

    it('should append rss feed', () => {
      initialState = {
        feeds: [a1, a2],
        feedsById: {
          [a1.id]: a1,
          [a2.id]: a2,
        },
      };

      const action = {
        type: RECEIVE_RSS_FEED,
        payload: a3,
      };

      const state = reducer(initialState, action);

      expect(state.feeds).to.have.length(3);
    });

    it('should remove rss feed', () => {
      initialState = {
        feeds: [a1],
        feedsById: {
          [a1.id]: a1,
        },
      };

      const action = {
        type: RECEIVE_REMOVE_RSS_FEED,
        payload: {
          id: a1.id,
        },
      };

      const state = reducer(initialState, action);

      expect(state.feeds).to.have.length(0);
      expect(state.feedsById).to.not.have.any.keys(a1.id);
    });
  });

  describe('rss posts', () => {
    it('should receive posts', () => {
      const action = {
        type: RECEIVE_RSS_POSTS,
        payload: {
          posts: [a1, a2],
        },
      };

      const state = reducer(initialState, action);

      expect(state.posts).to.have.length(2);
      expect(state.postsById.a1).to.equal(a1);
      expect(state.postsById.a2).to.equal(a2);
    });

    it('should replace post', () => {
      initialState = {
        posts: [a1, a2],
        postsById: {
          [a1.id]: a1,
          [a2.id]: a2,
        },
      };

      const a2Alt = {
        id: 'a2',
        alt: true,
      };

      const action = {
        type: RECEIVE_RSS_POST,
        payload: a2Alt,
      };

      const state = reducer(initialState, action);

      expect(state.posts).to.have.length(2);
      expect(state.postsById.a2).to.equal(a2Alt);
    });

    it('should append post', () => {
      initialState = {
        posts: [a1, a2],
        postsById: {
          [a1.id]: a1,
          [a2.id]: a2,
        },
      };

      const action = {
        type: RECEIVE_RSS_POST,
        payload: a3,
      };

      const state = reducer(initialState, action);

      expect(state.posts).to.have.length(3);
    });

    it('should reset posts', () => {
      initialState = {
        posts: [a1],
        postsById: {
          [a1.id]: a1,
        },
      };

      const action = {
        type: RESET_RSS_POSTS,
      };

      const state = reducer(initialState, action);

      expect(state.posts).to.have.length(0);
    });
  });
});
