import React, { Component, PropTypes } from 'react';
import { PageTitle } from 'lib/components/page';

export default class SettingsAccountsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <PageTitle>Accounts</PageTitle>
        {this.props.children}
      </div>
    );
  }
}

SettingsAccountsPage.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};
