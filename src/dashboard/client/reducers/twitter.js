import keyBy from 'lodash/keyBy';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
};

export default function twitterPostsReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_TWITTER_POSTS':
      return {
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
