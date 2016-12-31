import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import cn from 'classnames';
import noop from 'lodash/noop';

function TextareaInner(props) {
  const {
    input,
    meta,
    outerOnFocus,
    outerOnBlur,
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
        onFocus={(e) => {
          const result = props.input.onFocus(e);
          outerOnFocus(e);
          return result;
        }}
        onBlur={(e) => {
          const result = props.input.onBlur(e);
          outerOnBlur(e);
          return result;
        }}
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
  outerOnFocus: PropTypes.func,
  outerOnBlur: PropTypes.func,
};

TextareaInner.defaultProps = {
  outerOnFocus: noop,
  outerOnBlur: noop,
};

export default function Textarea(props, context) {
  return (
    <Field
      id={props.id || context.formGroupId}
      className={cn('form-control', props.className)}
      component={TextareaInner}
      name={props.name || context.formGroupName}
      {...props}
      outerOnFocus={props.onFocus}
      outerOnBlur={props.onBlur}
    />
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Textarea.contextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
