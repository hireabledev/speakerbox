import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import noop from 'lodash/noop';
import { Field } from 'redux-form';
import fetch from 'lib/fetch';
import Icon from 'lib/client/components/icon';

export class ImagePicker extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.input.value && this.inputElement) {
      this.inputElement.value = '';
    }
  }

  render() {
    const {
      input,
      meta, // eslint-disable-line no-unused-vars
      disabled,
      placeholder,
      ...inputProps
    } = this.props;

    const handleChange = async (e) => {
      const data = new FormData();
      data.append('files', e.target.files[0]);

      const res = await fetch('/api/uploads', { method: 'POST', body: data });
      const upload = res.body;
      input.onChange(upload.url);
      return upload;
    };

    const value = input.value;

    const onBlur = input.onBlur || noop;
    const onFocus = input.onFocus || noop;

    return (
      <div
        {...inputProps}
        className={cn(inputProps.className, 'sb-img-picker', {
          active: value,
        })}
      >
        {value && (
          <div className="sb-img-picker-body">
            <img className="sb-img-picker-img" src={value} alt="Upload" />
            {!disabled && (
              <button
                className="sb-img-picker-remove"
                type="button"
                onClick={() => {
                  input.onChange(null);
                  this.inputElement.value = '';
                }}
              >
                <Icon name="remove" label="remove" />
              </button>
            )}
          </div>
        )}
        {!value && (
          <div className="sb-img-picker-placeholder">
            <Icon name="photo" label="photo" />
            {' '}
            {placeholder || 'Select image'}
          </div>
        )}
        <input
          ref={el => { this.inputElement = el; }}
          className="sb-img-picker-input"
          disabled={disabled}
          type="file"
          onChange={handleChange}
          onBlur={() => onBlur(value)}
          onFocus={() => onFocus(value)}
        />
      </div>
    );
  }
}

ImagePicker.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
};

export default function ImageInput(props, context) {
  return (
    <Field
      id={props.id || context.formGroupId}
      className={cn('form-control', props.className)}
      component={ImagePicker}
      name={props.name || context.formGroupName}
      {...props}
    />
  );
}

ImageInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

ImageInput.contextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
