import React, { PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';
import Menu from './menu';

export default function App(props) {
  return (
    <div className="has-menu">
      <Menu />
      <Loading style={{ backgroundColor: '#1dac9a' }} />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
