import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';

export default function Input(props, context) {
  return (
    <Field
      id={encodeURIComponent(props.name + context.formGroupId)}
      className={cn('form-control', props.className)}
      component="input"
      {...props}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

Input.contextTypes = {
  formGroupId: PropTypes.string,
};
