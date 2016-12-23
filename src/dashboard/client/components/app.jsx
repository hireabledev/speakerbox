import React, { PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';

export default function App(props) {
  return (
    <div className="sb-app">
      <Loading className="sb-loading" />
      <div className="sb-app-body">
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
