import React, { PropTypes } from 'react';
import Form, { FormGroup, Label, Input } from 'lib/components/form';

function handleSubmit(e) {
  e.preventDefault();
  debugger;
}

export default function SettingsUserPage(props) {
  const initialValues = {
    displayName: props.user.displayName,
  };

  return (
    <div>
      <h1>User</h1>
      <Form
        name="settingsUser"
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <FormGroup>
          <Label htmlFor="displayName">Name</Label>
          <Input type="text" name="displayName" placeholder="Name" />
        </FormGroup>
        <button className="btn btn-primary" type="submit">Save</button>
      </Form>
    </div>
  );
}

SettingsUserPage.propTypes = {
  user: PropTypes.object,
};
