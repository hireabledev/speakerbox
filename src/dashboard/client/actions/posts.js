import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function receivePosts({ posts, more }) {
  return {
    type: 'RECEIVE_POSTS',
    payload: {
      posts,
      more,
    },
  };
}

export function fetchPosts() {
  return async (dispatch, getState) => {
    const { posts } = getState();
    dispatch(showLoading());
    const res = await fetch(`/api/posts?skip=${posts.posts.length}`, { credentials: 'include' });
    dispatch(hideLoading());
    const { data, more } = await res.json();
    dispatch(receivePosts({ posts: data, more }));
  };
}
