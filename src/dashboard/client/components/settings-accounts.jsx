import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PageTitle } from 'lib/client/components/page';
import { removeAccount } from '../actions/accounts';

function AccountItem({ account, remove }) {
  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.type}</td>
      <td>{account.id}</td>
      <td>
        <button className="btn btn-sm btn-danger" type="button" onClick={() => remove(account.id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}

AccountItem.propTypes = {
  account: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export function SettingsAccountsPage(props) {
  const { accounts } = props;
  return (
    <div>
      <PageTitle flush>Accounts</PageTitle>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>ID</th>
            <th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <AccountItem key={account.id} account={account} remove={props.removeAccount} />
          ))}
        </tbody>
      </table>
      <a className="btn btn-primary" href="/sso">Add Account</a>
    </div>
  );
}

SettingsAccountsPage.propTypes = {
  accounts: PropTypes.array.isRequired,
  removeAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  accounts: state.accounts.accounts,
});

const mapDispatchToProps = (dispatch) => ({
  removeAccount: id => dispatch(removeAccount(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccountsPage);
