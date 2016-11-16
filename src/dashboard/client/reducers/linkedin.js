const initialState = {
  posts: [],
  morePosts: false,
};

export default function linkedinPostsReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_LINKEDIN_POSTS':
      return {
        posts: [...state.posts, ...action.payload.posts],
        morePosts: action.payload.more,
      };
    default:
      return state;
  }
}
