import React, { PropTypes } from 'react';

export default function Page({ children, bg }) {
  return (
    <div className={`page page-bg-${bg}`}>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.oneOf(['none', 'light']),
};

Page.defaultProps = {
  bg: 'light',
};
