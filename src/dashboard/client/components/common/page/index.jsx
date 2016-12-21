import React, { PropTypes } from 'react';
import cn from 'classnames';

export default function Page({ children, sidebar, sidebarSecondary, bg }) {
  return (
    <div className={`sb-page sb-page-bg-${bg}`}>
      <div className="container-fluid">
        <div className="row">
          {sidebar && (
            <div className="sb-page-sidebar col-xs-12 col-md-4 col-lg-3">
              {sidebar}
            </div>
          )}
          <div
            className={cn({
              'col-xs-12': true,
              'col-md-8 col-lg-9': sidebar,
              'col-md-4 col-lg-6': sidebarSecondary,
            })}
          >
            {children}
          </div>
          {sidebarSecondary && (
            <div className="sb-page-sidebar sb-sidebar-secondary col-xs-12 col-md-4 col-lg-3">
              {sidebarSecondary}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,
  sidebarSecondary: PropTypes.node,
  bg: PropTypes.oneOf(['none', 'light']),
};

Page.defaultProps = {
  bg: 'light',
  sidebar: null,
};
