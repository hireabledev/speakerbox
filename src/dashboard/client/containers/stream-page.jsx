import { connect } from 'react-redux';
import StreamPage from '../components/stream-page';
import { fetchAccounts } from '../actions/accounts';
import { fetchFeeds } from '../actions/feeds';
import { fetchPosts } from '../actions/posts';

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
  moreAccounts: state.accounts.moreAccounts,
  accountVisibility: state.accounts.visibility,
  feeds: state.rss.feeds,
  moreFeeds: state.rss.moreFeeds,
  feedVisibility: state.rss.visibility,
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
  fetchPosts: (options) => dispatch(fetchPosts(options)),
  fetchAccounts: () => dispatch(fetchAccounts()),
  fetchFeeds: () => dispatch(fetchFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
