import React, { PropTypes } from 'react';
import If from 'lib/client/components/if';
import MenuLink from './menu-link';

export default function Menu({ children }) {
  return (
    <nav className="sb-menu">
      <MenuLink className="sb-menu-brand" to="/">
        SpeakerBox
      </MenuLink>
      <div className="sb-menu-list">
        <MenuLink className="sb-menu-link" to="/stream">
          Stream
        </MenuLink>
        <MenuLink className="sb-menu-link" to="/schedule">
          Schedule
        </MenuLink>
        <MenuLink className="sb-menu-link" to="/metrics">
          Metrics
        </MenuLink>
        <MenuLink className="sb-menu-link" to="/settings">
          Settings
        </MenuLink>
      </div>
      <If truthy={children}>
        <div className="sb-menu-content">
          {children}
        </div>
      </If>
    </nav>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
};
