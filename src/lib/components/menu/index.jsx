import React, { PropTypes } from 'react';
import If from '../if';
import Icon from '../icon';
import MenuLink from './menu-link';

export default function Menu({ children }) {
  return (
    <nav className="sb-menu">
      <MenuLink className="sb-menu-brand" to="/">
        SpeakerBox
      </MenuLink>
      <div className="sb-menu-list">
        <MenuLink className="sb-menu-link" to="/schedule">
          <Icon name="calendar" label="schedule" fixedWidth />
          {' '}
          Schedule
        </MenuLink>
        <MenuLink className="sb-menu-link" to="/stream">
          <Icon name="list-alt" label="stream" fixedWidth />
          {' '}
          Stream
        </MenuLink>
        <MenuLink className="sb-menu-link" to="/favorites">
          <Icon name="star" label="favorites" fixedWidth />
          {' '}
          Favorites
        </MenuLink>
        <MenuLink className="sb-menu-link" to="/metrics">
          <Icon name="line-chart" label="metrics" fixedWidth />
          {' '}
          Metrics
        </MenuLink>
        <MenuLink className="sb-menu-link" to="/settings">
          <Icon name="cog" label="settings" fixedWidth />
          {' '}
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
