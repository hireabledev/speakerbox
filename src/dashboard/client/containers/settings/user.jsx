import { connect } from 'react-redux';
import SettingsUserPage from '../../components/settings/user';

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUserPage);
