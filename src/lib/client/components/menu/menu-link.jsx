import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';

export default function MenuLink(props) {
  return (
    <Link
      activeClassName="active"
      {...props}
      onClick={e => {
        mixpanel.track('Menu link clicked', {
          text: e.target.textContent.trim(),
          url: props.to,
        });
      }}
    >
      {props.children}
    </Link>
  );
}

MenuLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};
