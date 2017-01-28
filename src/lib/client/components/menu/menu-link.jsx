import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';

export default function MenuLink(props) {
  return (
    <Link activeClassName="active" {...props}>{props.children}</Link>
  );
}

MenuLink.propTypes = {
  children: PropTypes.node,
};
