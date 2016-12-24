import React, { Component, PropTypes } from 'react';

export default class SettingsUserPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>User</h1>
        {this.props.children}
      </div>
    );
  }
}

SettingsUserPage.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};
