import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Form, { FormGroup, Label, Input } from 'lib/components/form';
import { PageTitle } from 'lib/components/page';
import { updateUser } from '../actions/user';

export function SettingsUserForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label htmlFor="displayName">Name</Label>
        <Input type="text" name="displayName" placeholder="Name" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input type="email" name="email" placeholder="Email Address" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="tel">Phone Number</Label>
        <Input type="tel" name="tel" placeholder="Phone Number" />
      </FormGroup>
      <button
        className="btn btn-primary"
        disabled={props.pristine || props.submitting}
        type="submit"
      >
          Save
      </button>
    </form>
  );
}

SettingsUserForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

export function SettingsUserPage(props) {
  const initialValues = {
    displayName: props.user.displayName,
    email: props.user.email,
    tel: props.user.tel,
  };

  return (
    <div>
      <PageTitle>User</PageTitle>
      <Form
        name="settingsUser"
        component={SettingsUserForm}
        onSubmit={values => props.updateUser(props.user.id, values)}
        initialValues={initialValues}
      />
    </div>
  );
}

SettingsUserPage.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (id, values) => dispatch(updateUser(id, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsUserPage);
