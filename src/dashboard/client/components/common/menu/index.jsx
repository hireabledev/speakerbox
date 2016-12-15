import React from 'react';
import MenuLink from './menu-link';

export default function Menu() {
  return (
    <div className="nav-placeholder">
      <nav className="nav is-fixed has-shadow">
        <div className="nav-left">
          <MenuLink className="nav-item is-brand" to="/">
            SpeakerBox
          </MenuLink>
          <MenuLink className="nav-item" to="/stream">
            Stream
          </MenuLink>
          <MenuLink className="nav-item" to="/schedule">
            Schedule
          </MenuLink>
          <MenuLink className="nav-item" to="/metrics">
            Metrics
          </MenuLink>
        </div>
        <div className="nav-right nav-menu">
          <MenuLink className="nav-item" to="/settings">
            Settings
          </MenuLink>
        </div>
      </nav>
    </div>
  );
}
