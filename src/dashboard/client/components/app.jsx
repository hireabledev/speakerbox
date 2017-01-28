import React, { Component, PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';
import { Notifs } from 'redux-notifications';
import { connect } from 'react-redux';
import Notif from 'lib/client/components/notification';
import { fetchUser } from '../actions/user';
import { fetchAccounts } from '../actions/accounts';
import { fetchFeeds } from '../actions/feeds';

export class App extends Component {
  componentDidMount() {
    Promise.all([
      this.props.fetchUser(),
      this.props.fetchAccounts(),
      this.props.fetchFeeds(),
    ]);
  }

  render() {
    return (
      <div className="sb-app">
        <Loading className="sb-loading" />
        <Notifs
          CustomComponent={Notif}
          componentClassName="notification"
        />
        <div className="sb-app-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  fetchUser: PropTypes.func.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  fetchFeeds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchAccounts: () => dispatch(fetchAccounts()),
  fetchFeeds: () => dispatch(fetchFeeds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
