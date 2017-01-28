import { expect } from 'chai';
import reducer from './linkedin';
import {
  RECEIVE_LINKEDIN_POSTS,
  RECEIVE_LINKEDIN_POST,
  RESET_LINKEDIN_POSTS,
  RECEIVE_REMOVE_LINKEDIN_SCHEDULED_POST,
} from '../constants/action-types';

describe('linkedin reducer', () => {
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
      'scheduledPosts',
      'scheduledPostsById',
      'moreScheduledPosts',
    ]);
  });

  it('should receive posts', () => {
    const action = {
      type: RECEIVE_LINKEDIN_POSTS,
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
      type: RECEIVE_LINKEDIN_POST,
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
      type: RECEIVE_LINKEDIN_POST,
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
      type: RESET_LINKEDIN_POSTS,
    };

    const state = reducer(initialState, action);

    expect(state.posts).to.have.length(0);
  });

  it('should remove scheduled post', () => {
    initialState = {
      scheduledPosts: [a1, a2],
      scheduledPostsById: {
        [a1.id]: a1,
        [a2.id]: a2,
      },
    };

    const action = {
      type: RECEIVE_REMOVE_LINKEDIN_SCHEDULED_POST,
      payload: {
        id: a2.id,
      },
    };

    const state = reducer(initialState, action);

    expect(state.scheduledPosts).to.have.length(1);
    expect(state.scheduledPosts[0]).to.equal(a1);
    expect(state.scheduledPostsById).to.not.have.any.keys(a2.id);
    expect(state.scheduledPostsById).to.have.any.keys(a1.id);
  });
});
