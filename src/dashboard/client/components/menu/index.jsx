import React from 'react';
import Icon from 'lib/client/components/icon';
import Menu from 'lib/client/components/menu';
import MenuLink from 'lib/client/components/menu/menu-link';

const links = (
  <div>
    <MenuLink className="sb-menu-link" to="/schedule">
      <Icon name="calendar" fixedWidth />
      {' '}
      Schedule
    </MenuLink>
    <MenuLink className="sb-menu-link" to="/stream">
      <Icon name="list-alt" fixedWidth />
      {' '}
      Stream
    </MenuLink>
    <MenuLink className="sb-menu-link" to="/favorites">
      <Icon name="star" fixedWidth />
      {' '}
      Favorites
    </MenuLink>
    <MenuLink className="sb-menu-link" to="/metrics">
      <Icon name="line-chart" fixedWidth />
      {' '}
      Metrics
    </MenuLink>
    <MenuLink className="sb-menu-link" to="/settings">
      <Icon name="cog" fixedWidth />
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
