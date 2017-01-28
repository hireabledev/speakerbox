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
  const icon = <span className={className} aria-hidden="true" />;
  const label = <span className="sr-only">{props.label || props.name}</span>;
  if (props.label) {
    return (
      <span>
        {icon}
        {label}
      </span>
    );
  }
  return icon;
}

Icon.propTypes = {
  className: PropTypes.string,
  fixedWidth: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
