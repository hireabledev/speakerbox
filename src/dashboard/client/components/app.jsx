import React, { PropTypes } from 'react';
import Loading from 'react-redux-loading-bar';
import Menu from './common/menu';

export default function App(props) {
  return (
    <div className="has-menu">
      <Menu />
      <Loading style={{ backgroundColor: '#CD7901' }} />
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
