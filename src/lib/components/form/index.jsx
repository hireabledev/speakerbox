import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

function Form(props) {
  return (
    <form name={props.name} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  name: PropTypes.string,
};

export default function ConnectedForm(props) {
  const {
    onSubmit,
    children,
    name,
    ...reduxFormProps
  } = props;

  const ReduxForm = reduxForm({
    form: name,
    ...reduxFormProps,
  })(Form);

  return (
    <ReduxForm name={name} onSubmit={onSubmit}>
      {children}
    </ReduxForm>
  );
}

ConnectedForm.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export { default as FormGroup } from './group';
export { default as Input } from './input';
export { default as Label } from './label';
export { Select, Option } from './label';
