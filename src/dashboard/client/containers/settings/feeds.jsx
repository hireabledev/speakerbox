import { connect } from 'react-redux';
import { addFeed, updateFeed, removeFeed } from '../../actions/feeds';
import SettingsFeedsPage from '../../components/settings/feeds';

const mapStateToProps = (state) => ({
  user: state.user.user,
  feeds: state.rss.feeds,
});

const mapDispatchToProps = (dispatch) => ({
  addFeed: body => dispatch(addFeed(body)),
  updateFeed: (id, body) => dispatch(updateFeed(id, body)),
  removeFeed: id => dispatch(removeFeed(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsFeedsPage);
