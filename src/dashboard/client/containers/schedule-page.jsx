import { connect } from 'react-redux';
import SchedulePage from '../components/schedule-page';
import { fetchAccounts } from '../actions/accounts';
import { fetchScheduledPosts } from '../actions/posts';

const mapStateToProps = (state) => ({
  accountVisibility: state.accounts.accountVisibility,
  facebookScheduledPosts: state.facebook.scheduledPosts,
  twitterScheduledPosts: state.twitter.scheduledPosts,
  linkedinScheduledPosts: state.linkedin.scheduledPosts,
  moreFacebookScheduledPosts: state.facebook.moreScheduledPosts,
  moreTwitterScheduledPosts: state.twitter.moreScheduledPosts,
  moreLinkedinScheduledPosts: state.linkedin.moreScheduledPosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchScheduledPosts: (options) => dispatch(fetchScheduledPosts(options)),
  fetchAccounts: () => dispatch(fetchAccounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
