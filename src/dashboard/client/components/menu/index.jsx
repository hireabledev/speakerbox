import React from 'react';
import Icon from 'lib/client/components/icon';
import Menu from 'lib/client/components/menu';
import MenuLink from 'lib/client/components/menu/menu-link';

const links = (
  <div>
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
);

export default function DashboardMenu(props) {
  return (
    <Menu
      links={links}
      {...props}
    />
  );
}
