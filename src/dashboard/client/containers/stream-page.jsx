import { connect } from 'react-redux';
import StreamPage from '../components/stream-page';
import { fetchPosts } from '../actions/posts';

const mapStateToProps = (state) => ({
  facebookPosts: state.facebook.posts,
  twitterPosts: state.twitter.posts,
  linkedInPosts: state.linkedin.posts,
  rssPosts: state.rss.posts,
  moreFacebookPosts: state.facebook.morePosts,
  moreTwitterPosts: state.twitter.morePosts,
  moreLinkedInPosts: state.linkedin.morePosts,
  moreRSSPosts: state.rss.morePosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
