import React, { PropTypes } from 'react';
import Sidebar from './sidebar';

export default function App(props) {
  return (
    <div className="has-sidebar">
      <Sidebar />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
