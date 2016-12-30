import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';
import Datetime from 'react-datetime';

export function DatetimePicker(props) {
  const {
    input,
    meta, // eslint-disable-line no-unused-vars
    afterToday,
    ...inputProps
  } = props;

  const now = new Date();

  return (
    <Datetime
      isValidDate={currentDate => {
        if (afterToday) {
          return currentDate.isAfter(now);
        }
        return true;
      }}
      inputProps={{
        placeholder: 'Select date and time',
        ...inputProps,
      }}
      value={input.value}
      onBlur={input.onBlur}
      onChange={input.onChange}
      onFocus={input.onFocus}
    />
  );
}

DatetimePicker.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  meta: PropTypes.object,
  afterToday: PropTypes.bool,
};

export default function DatetimeInput(props, context) {
  return (
    <Field
      id={encodeURIComponent(props.name + context.formGroupId)}
      className={cn('form-control', props.className)}
      component={DatetimePicker}
      {...props}
    />
  );
}

DatetimeInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

DatetimeInput.contextTypes = {
  formGroupId: PropTypes.string,
};
