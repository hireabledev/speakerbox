/* eslint 'react/no-unused-prop-types': 0 */

import React, { PropTypes } from 'react';
import Datetime from 'react-datetime';
import startCase from 'lodash/startCase';
import moment from 'moment';
import RequiredIndicator from '../required-indicator';
import SelectUser from '../select/user';
import SelectAccount from '../select/account';
import SelectFeed from '../select/feed';
import SelectPost from '../select/post';

function isEditable(field) {
  return field.editable !== false;
}

function getValueFromEvent(e) {
  if (e) {
    if (e.currentTarget) {
      return e.currentTarget.value;
    } else if (e.value) {
      return e.value;
    }
  }
  return e;
}

function parseValue(value) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }
  return value;
}

function normalizeOnChange(onChange, field) {
  return function wrappedOnChange(e) {
    const value = parseValue(getValueFromEvent(e));
    const key = field.key;
    onChange(value, key);
  };
}

function notNullOrUndefined(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return value;
}

function getInputFor(field, value, onChange) {
  const commonProps = {
    value,
    onChange,
    name: field.key,
    id: field.key,
    required: field.required,
  };
  switch (field.type) {
    case 'date': {
      const selectedDate = {
        selected: value ? moment(value) : null,
      };
      return (
        <Datetime
          {...commonProps}
          {...selectedDate}
          className="form-control"
          placeholderText={field.placeholder}
        />
      );
    }
    case 'id':
      switch (field.key) { // eslint-disable-line default-case
        case 'userId':
          return (
            <SelectUser
              {...commonProps}
              clearable={!field.required}
            />
          );
        case 'accountId':
          return (
            <SelectAccount
              {...commonProps}
              clearable={!field.required}
            />
          );
        case 'feedId':
          return (
            <SelectFeed
              {...commonProps}
              clearable={!field.required}
            />
          );
        case 'postId':
          return (
            <SelectPost
              {...commonProps}
              clearable={!field.required}
            />
          );
      }
    case 'textarea': // eslint-disable-line no-fallthrough
      return (
        <textarea
          {...commonProps}
          className="form-control"
          value={notNullOrUndefined(value)}
          placeholder={field.placeholder}
        />
      );
    case 'checkbox':
    case 'radio':
      return (
        <div>
          {field.choices.map(choice => {
            const id = `${field.key}-${choice.value}`;
            return (
              <div key={choice.value} className="form-check">
                <label htmlFor={id} className="form-check-label">
                  <input
                    name={field.key}
                    id={id}
                    className="form-check-input"
                    type={field.type}
                    value={choice.value}
                    checked={value === choice.value}
                    onChange={onChange}
                  /> {choice.label}
                </label>
              </div>
            );
          })}
        </div>
      );
    default:
      return (
        <input
          {...commonProps}
          className="form-control"
          type={field.type}
          value={notNullOrUndefined(value)}
          placeholder={field.placeholder}
        />
      );
  }
}

export default function ModelForm(props) {
  const { fields, values, onChange } = props;

  const items = values
    ? fields.filter(isEditable).map(field => (
      <div key={field.key} className="form-group">
        <label className="form-label" htmlFor={field.key}>
          {startCase(field.key)}
          <RequiredIndicator required={field.required} />
        </label>{/* TODO: fix for radio/checkbox */}
        {getInputFor(field, values[field.key], normalizeOnChange(onChange, field))}
      </div>
    ))
    : [];

  return (
    <form onSubmit={props.onSubmit} name={props.name}>
      {items}
      <button className="btn btn-success" type="submit">Save</button>
    </form>
  );
}

ModelForm.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'id',
      'number',
      'textarea',
      'text',
      'email',
      'tel',
      'date',
      'radio',
      'checkbox',
      'userId',
      'accountId',
      'feedId',
      'postId',
    ]).isRequired,
    required: PropTypes.bool,
    choices: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
      ]),
    })),
  })).isRequired,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired, // (value, key)
  onSubmit: PropTypes.func.isRequired,
};
