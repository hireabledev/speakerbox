import React, { PropTypes } from 'react';

export default function Subnav({ children }) {
  return (
    <div className="sb-subnav">
      {children}
    </div>
  );
}

Subnav.propTypes = {
  children: PropTypes.node,
};
