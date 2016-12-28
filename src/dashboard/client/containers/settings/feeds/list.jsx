import { connect } from 'react-redux';
import SettingsFeedsListPage from '../../../components/settings/feeds/list';
import { removeFeed } from '../../../actions/feeds';

const mapStateToProps = (state) => ({
  feeds: state.rss.feeds,
});

const mapDispatchToProps = (dispatch) => ({
  removeFeed: id => dispatch(removeFeed(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsFeedsListPage);
