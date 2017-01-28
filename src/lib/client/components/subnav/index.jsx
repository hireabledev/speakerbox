import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';

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

export function SubnavLink({ to, children }) {
  return (
    <Link className="sb-subnav-link" activeClassName="active" to={to}>{children}</Link>
  );
}

SubnavLink.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
    }),
  ]).isRequired,
  children: PropTypes.node.isRequired,
};
