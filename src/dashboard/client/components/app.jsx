import React, { Component, PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';

export default class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="sb-app">
        <Loading className="sb-loading" />
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
};
