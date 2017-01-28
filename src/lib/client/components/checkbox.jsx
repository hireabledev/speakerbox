import React, { PropTypes } from 'react';
import cn from 'classnames';
import omit from 'lodash/omit';

export default function Checkbox(props) {
  const inputProps = omit(props, ['label', 'htmlFor']);
  return (
    <label className="custom-control custom-checkbox" htmlFor={props.htmlFor}>
      <input className="custom-control-input" type="checkbox" {...inputProps} />
      <span className="custom-control-indicator" />
      <span className="custom-control-description">{props.label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  htmlFor: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export function FakeCheckbox(props) {
  const inputProps = omit(props, ['label', 'htmlFor']);
  return (
    <span className="custom-control custom-checkbox">
      <input className="custom-control-input" type="checkbox" {...inputProps} />
      <span className="custom-control-indicator" />
      <span className="custom-control-description">{props.label}</span>
    </span>
  );
}

FakeCheckbox.propTypes = Checkbox.propTypes;

export function IconCheckbox(props) {
  const icon = props.icon ? `fa-${props.icon}` : null;
  const inputProps = omit(props, ['label', 'htmlFor', 'icon']);
  return (
    <label className="custom-control custom-checkbox icon-checkbox" htmlFor={props.htmlFor}>
      <input className="custom-control-input" type="checkbox" {...inputProps} />
      <span className={cn('custom-control-indicator fa fa-fw', icon)} aria-hidden="true" />
      <span className="custom-control-description">{props.label}</span>
    </label>
  );
}

IconCheckbox.propTypes = Checkbox.propTypes;
