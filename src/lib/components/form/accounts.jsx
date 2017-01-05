import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import Option from 'react-select/lib/Option';
import Icon from 'lib/components/icon';

function AccountOption(props) {
  return (
    <span className="Select-account Select-account-selected">
      <img className="Select-account-img" src={props.imgUrl} alt="Account" />
      {' '}
      {props.name}
      {' – '}
      <Icon name={props.type} label={props.type} />
    </span>
  );
}

AccountOption.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
};

function AccountPickerOption(props) {
  return (
    <Option {...props}>
      <div className="Select-account">
        <img className="Select-account-img" src={props.option.imgUrl} alt="Account" />
        {' '}
        {props.children}
        {' – '}
        <Icon name={props.option.type} label={props.option.type} />
      </div>
    </Option>
  );
}

AccountPickerOption.propTypes = {
  option: PropTypes.shape({
    type: PropTypes.string.isRequired,
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
        valueRenderer={AccountOption}
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
