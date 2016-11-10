import React from 'react';
import Link from 'react-router/lib/Link';
import Icon from '../../../../lib/client/components/icon';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">
        <Link to="/">
          S
          <span className="sidebar-title-text">peakerBox</span>
        </Link>
      </h1>
      <nav className="sidebar-nav">
        <Link className="sidebar-nav-link" to="/stream">
          <Icon className="sidebar-nav-icon" name="newspaper-o" label="Stream" fixedWidth />
          {' '}
          <span className="sidebar-nav-label">Stream</span>
        </Link>
      </nav>
    </div>
  );
}
