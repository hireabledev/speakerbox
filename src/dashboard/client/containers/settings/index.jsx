import { connect } from 'react-redux';
import SettingsPage from '../../components/settings';

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
