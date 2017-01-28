/* eslint "jsx-a11y/no-static-element-interactions": 0 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import If from '../if';
import Icon from '../icon';
import MenuLink from './menu-link';
import { toggleMenu } from '../../actions/menu';

function Menu({ children, expanded, toggle }) {
  return (
    <div className="sb-menu-wrap">
      <MenuLink
        className={cn('sb-menu-brand sb-menu-brand-mobile', {
          'sb-menu-brand-mobile-active': expanded,
        })}
        to="/"
      >
        SpeakerBox
      </MenuLink>
      <nav className={cn('sb-menu', { 'sb-menu-expanded': expanded })}>
        <MenuLink className="sb-menu-brand" to="/">
          SpeakerBox
        </MenuLink>
        <div className="sb-menu-list" onClick={toggle}>
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
      <button
        className={cn('sb-menu-toggle', { 'sb-menu-toggle-active': expanded })}
        onClick={toggle}
      >
        <Icon
          fixedWidth
          name={expanded ? 'remove' : 'bars'}
          label={expanded ? 'Close Menu' : 'Open Menu'}
        />
      </button>
    </div>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  expanded: state.menu.expanded,
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
