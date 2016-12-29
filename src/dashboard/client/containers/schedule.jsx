import { connect } from 'react-redux';
import SchedulePage from '../components/schedule';
import { fetchAllScheduledPosts } from '../actions/posts';

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
  fetchScheduledPosts: (options) => dispatch(fetchAllScheduledPosts(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
