import keyBy from 'lodash/keyBy';

const initialState = {
  posts: [],
  postsById: {},
  morePosts: false,
};

export default function linkedinPostsReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_LINKEDIN_POSTS':
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
