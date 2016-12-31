import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';

export default function Input(props, context) {
  return (
    <Field
      id={props.id || context.formGroupId}
      className={cn('form-control', props.className)}
      component="input"
      name={props.name || context.formGroupName}
      {...props}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

Input.contextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
