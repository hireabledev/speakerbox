import React from 'react';
import MenuLink from './menu-link';

export default function Menu() {
  return (
    <div className="navbar-placeholder">
      <nav className="navbar navbar-dark navbar-fixed-top">
        <MenuLink className="navbar-brand" to="/">
          SpeakerBox
        </MenuLink>
        <div className="nav navbar-nav">
          <MenuLink className="nav-item nav-link" to="/stream">
            Stream
          </MenuLink>
          <MenuLink className="nav-item nav-link" to="/schedule">
            Schedule
          </MenuLink>
          <MenuLink className="nav-item nav-link" to="/metrics">
            Metrics
          </MenuLink>
        </div>
        <div className="nav navbar-nav float-xs-right">
          <MenuLink className="nav-item nav-link" to="/settings">
            Settings
          </MenuLink>
        </div>
      </nav>
    </div>
  );
}
