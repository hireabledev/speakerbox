import { connect } from 'react-redux';
import FeedForm from '../../components/common/feed-form';
import { addFeed, updateFeed } from '../../actions/feeds';

const mapDispatchToProps = dispatch => ({
  addFeed: body => dispatch(addFeed(body)),
  updateFeed: (id, body) => dispatch(updateFeed(id, body)),
});

export default connect(null, mapDispatchToProps)(FeedForm);
