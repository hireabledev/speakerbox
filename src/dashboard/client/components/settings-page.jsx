import React, { Component, PropTypes } from 'react';
import Page, { PageTitle } from 'lib/components/page';
import Subnav from 'lib/components/subnav';

export default class SettingsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Page
        bg="light"
        padY
        subnav={
          <Subnav>
            <a href="#" className="sb-subnav-item">
              User
            </a>
            <a href="#" className="sb-subnav-item">
              Accounts
            </a>
          </Subnav>
        }
      >
        <PageTitle>Settings</PageTitle>
        <p>TODO</p>
      </Page>
    );
  }
}

SettingsPage.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};
