import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';

export default function MenuLink(props) {
  const commonProps = {
    onClick: e => {
      mixpanel.track('Menu link clicked', {
        text: e.target.textContent.trim(),
        url: props.to,
      });
    },
  };

  if (props.href) {
    return <a {...props} {...commonProps} target="noreferrer noopener">{props.children}</a>;
  }
  return (
    <Link activeClassName="active" {...props} {...commonProps}>{props.children}</Link>
  );
}

MenuLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  href: PropTypes.string,
};
