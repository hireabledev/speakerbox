import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';

export default function Textarea(props, context) {
  return (
    <Field
      id={props.id || context.formGroupId}
      className={cn('form-control', props.className)}
      component="textarea"
      name={props.name || context.formGroupName}
      {...props}
    />
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

Textarea.contextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
