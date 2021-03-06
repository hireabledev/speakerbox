import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Subnav, { SubnavLink } from 'lib/client/components/subnav';
import Page from './page';

export class SettingsPage extends Component {
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

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(SettingsPage);
