import React, { Component, PropTypes } from 'react';

export default class SettingsAccountsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>Accounts</h1>
        {this.props.children}
      </div>
    );
  }
}

SettingsAccountsPage.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};
