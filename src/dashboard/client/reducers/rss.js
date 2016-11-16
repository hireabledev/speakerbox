const initialState = {
  posts: [],
  morePosts: false,
  feeds: [],
  moreFeeds: false,
};

export default function rssFeedsReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_RSS_POSTS':
      return {
        posts: [...state.posts, ...action.payload.posts],
        morePosts: action.payload.more,
      };
    case 'RECEIVE_RSS_FEEDS':
      return {
        feeds: [...state.feeds, ...action.payload.feeds],
        moreFeeds: action.payload.more,
      };
    default:
      return state;
  }
}
