import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';

export default function Textarea(props, context) {
  return (
    <Field
      id={props.name + context.formGroupId}
      className={cn('form-control', props.className)}
      component="textarea"
      {...props}
    />
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

Textarea.contextTypes = {
  formGroupId: PropTypes.string,
};
