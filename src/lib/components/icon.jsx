import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Icon(props) {
  const className = classNames(
    `fa fa-${props.name}`,
    {
      'fa-fw': props.fixedWidth,
    },
    props.className
  );
  return (
    <span>
      <span className={className} aria-hidden="true" />
      <span className="sr-only">{props.label}</span>
    </span>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  fixedWidth: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
