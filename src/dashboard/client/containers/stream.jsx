import { connect } from 'react-redux';
import StreamPage from '../components/stream';
import { fetchPosts } from '../actions/posts';

const mapStateToProps = (state) => ({
  accountVisibility: state.accounts.accountVisibility,
  feedVisibility: state.rss.feedVisibility,
  facebookPosts: state.facebook.posts,
  twitterPosts: state.twitter.posts,
  linkedinPosts: state.linkedin.posts,
  rssPosts: state.rss.posts,
  moreFacebookPosts: state.facebook.morePosts,
  moreTwitterPosts: state.twitter.morePosts,
  moreLinkedinPosts: state.linkedin.morePosts,
  moreRSSPosts: state.rss.morePosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (options) => dispatch(fetchPosts(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
