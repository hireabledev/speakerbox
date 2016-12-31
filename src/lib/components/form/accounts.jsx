import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import Option from 'react-select/lib/Option';

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
    meta,
    ...inputProps
  } = props;

  return (
    <div className="form-control-container">
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
        onBlur={() => input.onBlur(input.value)}
        onFocus={() => input.onFocus(input.value)}
        value={input.value}
      />
      {meta.error && (
        <div className="form-control-feedback">{meta.error}</div>
      )}
    </div>
  );
}

AccountPicker.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    })),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
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
      id={props.id || context.formGroupId}
      className={cn(props.className)}
      component={AccountPickerContainer}
      name={props.name || context.formGroupName}
      // normalize={values => values.map(value => value.id)}
      {...props}
    />
  );
}

AccountSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

AccountSelect.contextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
