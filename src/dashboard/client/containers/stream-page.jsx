import { connect } from 'react-redux';
import StreamPage from '../components/stream-page';
import { fetchPosts } from '../actions/posts';

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  morePosts: state.posts.more,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
