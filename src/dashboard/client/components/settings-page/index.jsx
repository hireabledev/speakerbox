import React, { Component, PropTypes } from 'react';

export default class SettingsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Settings</h1>
        <p>TODO</p>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  children: PropTypes.node,
};
