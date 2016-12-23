import { connect } from 'react-redux';
import AccountList from '../components/account-list';

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
  accountVisibility: state.accounts.accountVisibility,
  feeds: state.rss.feeds,
  feedVisibility: state.rss.feedVisibility,
});

export default connect(mapStateToProps)(AccountList);
