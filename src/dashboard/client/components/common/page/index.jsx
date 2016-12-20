import React, { PropTypes } from 'react';

export default function Page({ children, sidebar, bg }) {
  return (
    <div className={`page page-bg-${bg}`}>
      <div className="container-fluid">
        <div className="row">
          {sidebar && (
            <div className="page-sidebar col-xs-12 col-md-4 col-lg-3">
              {sidebar}
            </div>
          )}
          <div className="col-xs-12 col-md-8 col-lg-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,
  bg: PropTypes.oneOf(['none', 'light']),
};

Page.defaultProps = {
  bg: 'light',
  sidebar: null,
};
