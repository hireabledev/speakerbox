import React, { PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';
import Sidebar from './sidebar';

export default function App(props) {
  return (
    <div className="has-sidebar">
      <Sidebar />
      <Loading style={{ backgroundColor: '#1dac9a' }} />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
