import { connect } from 'react-redux';
import TypeLabel from '../../components/post/type-label';

const mapStateToProps = (state) => ({
  accountsById: state.accounts.accountsById,
  feedsById: state.rss.feedsById,
});

export default connect(mapStateToProps)(TypeLabel);
