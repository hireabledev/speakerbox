import React, { PropTypes } from 'react';
import cn from 'classnames';
import If from '../if';

export { default as PageTitle } from './page-title';

export default function Page({ children, menu, subnav, sidebar, sidebarSecondary, bg, padY }) {
  const oneSidebar = sidebar || sidebarSecondary;
  const bothSidebars = sidebar && sidebarSecondary;
  return (
    <div
      className={cn(`sb-page sb-page-bg-${bg}`, {
        'sb-page-has-menu': menu,
        'sb-page-has-padding-y': padY,
      })}
    >
      <If truthy={menu}>
        {menu}
      </If>
      <div className="sb-page-content">
        <If truthy={subnav}>
          {subnav}
        </If>
        <div className="container-fluid">
          <div className="row">
            <If truthy={sidebar}>
              <div className="sb-page-sidebar col-xs-12 col-lg-3">
                {sidebar}
              </div>
            </If>
            <div
              className={cn({
                'sb-page-body': true,
                'col-12': true,
                'col-lg-9': oneSidebar && !bothSidebars,
                'col-lg-6': bothSidebars,
              })}
            >
              {children}
            </div>
            <If truthy={sidebarSecondary}>
              <div
                className="sb-page-sidebar sb-page-sidebar-secondary col-xs-12 col-lg-3"
              >
                {sidebarSecondary}
              </div>
            </If>
          </div>
        </div>
      </div>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.oneOf(['none', 'light']),
  menu: PropTypes.node,
  subnav: PropTypes.node,
  padY: PropTypes.bool,
  sidebar: PropTypes.node,
  sidebarSecondary: PropTypes.node,
};

Page.defaultProps = {
  bg: 'light',
  sidebar: null,
};
