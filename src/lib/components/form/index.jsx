import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

export default function Form(props) {
  const {
    children,
    name,
    onSubmit,
    component,
    ...reduxFormProps
  } = props;

  const ReduxForm = reduxForm({
    form: name,
    enableReinitialize: true,
    onSubmit,
    ...reduxFormProps,
  })(component);

  return (
    <ReduxForm name={name}>
      {children}
    </ReduxForm>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

export { default as FormGroup } from './group';
export { default as Input } from './input';
export { default as Label } from './label';
export { Select, Option } from './label';
