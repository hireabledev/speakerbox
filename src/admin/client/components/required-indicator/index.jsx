import React from 'react';

export default function RequiredIndicator(props) {
  let result = null;

  if (props.required === true) {
    result = <span className="text-danger" title="required"> *</span>;
  }

  return result;
}
