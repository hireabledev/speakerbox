import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';
import Datetime from 'react-datetime';
import moment from 'moment';

export function DatetimePicker(props) {
  const {
    input,
    meta,
    afterToday,
    ...inputProps
  } = props;

  const today = moment().startOf('day').subtract(1, 'ms');

  return (
    <div className="form-control-container">
      <Datetime
        isValidDate={currentDate => {
          if (afterToday) {
            return currentDate.isAfter(today);
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
      {meta.error && (
        <div className="form-control-feedback">{meta.error}</div>
      )}
    </div>
  );
}

DatetimePicker.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object, // TODO: moment or datetime
    ]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
  afterToday: PropTypes.bool,
};

export default function DatetimeInput(props, context) {
  return (
    <Field
      id={props.id || context.formGroupId}
      className={cn('form-control', props.className)}
      component={DatetimePicker}
      name={props.name || context.formGroupName}
      {...props}
    />
  );
}

DatetimeInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

DatetimeInput.contextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
