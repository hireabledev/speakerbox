import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';
import fetch from 'lib/fetch';
import Icon from 'lib/components/icon';

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

    return (
      <div {...inputProps} className={cn(inputProps.className, 'sb-img-picker')}>
        {value && (
          <div className="sb-img-picker-body">
            <img className="sb-img-picker-img" src={value} alt="Upload" />
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
          </div>
        )}
        {!value && (
          <div className="sb-img-picker-placeholder">
            <Icon name="photo" label="photo" />
            {' '}
            {inputProps.placeholder || 'Select image'}
          </div>
        )}
        <input
          ref={el => { this.inputElement = el; }}
          className="sb-img-picker-input"
          type="file"
          onChange={handleChange}
          onBlur={() => input.onBlur(value)}
          onFocus={() => input.onFocus(value)}
        />
      </div>
    );
  }
}

ImagePicker.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
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
