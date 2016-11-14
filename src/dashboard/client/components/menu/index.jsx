import React from 'react';
import Link from 'react-router/lib/Link';
import Icon from '../../../../lib/client/components/icon';

export default function Menu() {
  return (
    <div className="menu">
      <h1 className="menu-title">
        <Link to="/">
          S
          <span className="menu-title-text">peakerBox</span>
        </Link>
      </h1>
      <nav className="menu-nav">
        <Link className="menu-nav-link" to="/stream">
          <Icon className="menu-nav-icon" name="newspaper-o" label="Stream" fixedWidth />
          {' '}
          <span className="menu-nav-label">Stream</span>
        </Link>
      </nav>
    </div>
  );
}
