import React, { Component, PropTypes } from 'react';
import Page from 'lib/components/page';
import Subnav, { SubnavLink } from 'lib/components/subnav';

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
            <SubnavLink to="/settings/user">
              User
            </SubnavLink>
            <SubnavLink to="/settings/accounts">
              Accounts
            </SubnavLink>
            <SubnavLink to="/settings/feeds">
              Feeds
            </SubnavLink>
          </Subnav>
        }
      >
        {this.props.children}
      </Page>
    );
  }
}

SettingsPage.propTypes = {
  children: PropTypes.node,
};
