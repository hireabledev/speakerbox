import { connect } from 'react-redux';
import App from '../components/app';
import { fetchUser } from '../actions/user';
import { fetchAccounts } from '../actions/accounts';
import { fetchFeeds } from '../actions/feeds';

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchAccounts: () => dispatch(fetchAccounts()),
  fetchFeeds: () => dispatch(fetchFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
