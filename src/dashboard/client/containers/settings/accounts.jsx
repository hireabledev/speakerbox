import { connect } from 'react-redux';
import SettingsAcountsPage from '../../components/settings/accounts';

const mapStateToProps = (state) => ({
  user: state.user.user,
  accounts: state.accounts.accounts,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAcountsPage);
