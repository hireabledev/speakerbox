import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import Option from 'react-select/lib/Option';
import find from 'lodash/find';

function AccountPickerOption(props) {
  return (
    <Option {...props}>
      <div className="Select-account">
        <img className="Select-account-img" src={props.option.imgUrl} alt="Account" />
        {' '}
        {props.children}
      </div>
    </Option>
  );
}

AccountPickerOption.propTypes = {
  option: PropTypes.shape({
    imgUrl: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export function AccountPicker(props) {
  const {
    accounts,
    input,
    meta, // eslint-disable-line no-unused-vars
    ...inputProps
  } = props;

  let value = [];

  if (props.input.value) {
    value = props.input.value.map(val => find(accounts, { id: val }));
  }

  return (
    <Select
      placeholder="Select account"
      {...inputProps}
      {...input}
      multi
      options={accounts}
      optionComponent={AccountPickerOption}
      valueKey="id"
      labelKey="name"
      onChange={input.onChange}
      onBlur={() => input.onBlur(value)}
      onFocus={() => input.onFocus(value)}
      value={value}
    />
  );
}

AccountPicker.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  meta: PropTypes.object,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
});

export const AccountPickerContainer = connect(mapStateToProps)(AccountPicker);

export default function AccountSelect(props, context) {
  return (
    <Field
      id={encodeURIComponent(props.name + context.formGroupId)}
      className={cn(props.className)}
      component={AccountPickerContainer}
      normalize={values => values.map(value => value.id)}
      {...props}
    />
  );
}

AccountSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

AccountSelect.contextTypes = {
  formGroupId: PropTypes.string,
};
