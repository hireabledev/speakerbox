import { connect } from 'react-redux';
import StreamPage from '../components/stream';
import { fetchAccounts } from '../actions/accounts';
import { fetchFeeds } from '../actions/feeds';
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
  fetchAccounts: () => dispatch(fetchAccounts()),
  fetchFeeds: () => dispatch(fetchFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
