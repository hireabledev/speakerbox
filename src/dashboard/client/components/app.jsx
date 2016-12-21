import React, { PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';
import Menu from './common/menu';

export default function App(props) {
  return (
    <div className="sb-app">
      <Menu />
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
