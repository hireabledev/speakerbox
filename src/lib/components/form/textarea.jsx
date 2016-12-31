import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';

function TextareaInner(props) {
  const {
    input,
    meta,
    ...inputProps
  } = props;
  return (
    <div className="form-control-container">
      <textarea
        {...inputProps}
        className={cn(props.className, {
          'form-control-danger': meta.invalid,
        })}
        {...input}
      />
      {meta.error && (
        <div className="form-control-feedback">{meta.error}</div>
      )}
    </div>
  );
}

TextareaInner.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    invalid: PropTypes.bool,
  }).isRequired,
  className: PropTypes.string,
};

export default function Textarea(props, context) {
  return (
    <Field
      id={props.id || context.formGroupId}
      className={cn('form-control', props.className)}
      component={TextareaInner}
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
