import { connect } from 'react-redux';
import SettingsUserPage from '../../components/settings/user';
import { updateUser } from '../../actions/user';

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, values) => dispatch(updateUser(id, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUserPage);
