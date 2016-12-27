import React, { Component, PropTypes } from 'react';
import { PageTitle } from 'lib/components/page';

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

export default class SettingsAccountsPage extends Component {
  componentDidMount() {
  }

  render() {
    const { accounts, removeAccount } = this.props;
    return (
      <div>
        <PageTitle>Accounts</PageTitle>
        <table className="table">
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
              <AccountItem key={account.id} account={account} remove={removeAccount} />
            ))}
          </tbody>
        </table>
        <a className="btn btn-primary" href="/sso">Add Account</a>
      </div>
    );
  }
}

SettingsAccountsPage.propTypes = {
  accounts: PropTypes.array.isRequired,
  removeAccount: PropTypes.func.isRequired,
};
