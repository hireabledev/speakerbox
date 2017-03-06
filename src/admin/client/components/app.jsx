import React, { PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';
import { Notifs } from 'redux-notifications';
import Notif from 'lib/client/components/notification';

export default function App(props) {
  return (
    <div className="sb-app">
      <Loading className="sb-loading" />
      <Notifs
        CustomComponent={Notif}
        componentClassName="notification"
      />
      <div className="sb-app-body">
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
