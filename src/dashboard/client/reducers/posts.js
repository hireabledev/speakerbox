const initialState = {
  posts: [],
  more: false,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_POSTS':
      return {
        posts: [...state.posts, ...action.payload.posts],
        more: action.payload.more,
      };
    default:
      return state;
  }
}
