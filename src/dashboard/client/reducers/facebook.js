import keyBy from 'lodash/keyBy';
import { RECEIVE_FACEBOOK_POSTS } from '../constants/action-types';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
};

export default function facebookPostsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FACEBOOK_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        postsById: {
          ...state.postsById,
          ...keyBy(action.payload.posts, 'id'),
        },
        morePosts: action.payload.more,
      };
    default:
      return state;
  }
}
