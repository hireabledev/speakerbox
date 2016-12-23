import React, { Component, PropTypes } from 'react';
import Page from './common/page';

export default class SettingsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Page bg="light">
        <h1>Settings</h1>
        <p>TODO</p>
      </Page>
    );
  }
}

SettingsPage.propTypes = {
  children: PropTypes.node,
};
