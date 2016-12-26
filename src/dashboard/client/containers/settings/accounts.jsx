import { connect } from 'react-redux';
import { removeAccount } from '../../actions/accounts';
import SettingsAcountsPage from '../../components/settings/accounts';

const mapStateToProps = (state) => ({
  user: state.user.user,
  accounts: state.accounts.accounts,
});

const mapDispatchToProps = (dispatch) => ({
  removeAccount: id => dispatch(removeAccount(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAcountsPage);
