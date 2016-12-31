import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Form, { FormGroup, Label, Textarea, Datetime, AccountSelect, ImagePicker } from 'lib/components/form';
import * as postActions from '../../actions/posts';

const FORM_NAME = 'scheduledPost';

export function RawPostForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label htmlFor="message" srOnly>Message</Label>
        <Textarea name="message" placeholder="What do you want to share?" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="date" srOnly>Date</Label>
        <Datetime name="date" required afterToday />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="accounts" srOnly>Accounts</Label>
        <AccountSelect name="accounts" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="imgUrl" srOnly>Image</Label>
        <ImagePicker name="imgUrl" required />
      </FormGroup>
      <button
        className="btn btn-primary"
        disabled={props.pristine || props.submitting}
        type="submit"
      >
        Save
      </button>
      {' '}
      {props.cancelButton}
    </form>
  );
}

RawPostForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  cancelButton: PropTypes.node,
};

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form
          name={FORM_NAME}
          component={RawPostForm}
          cancelButton={this.props.cancelButton}
          onSubmit={async (values, _, form) => {
            const results = await Promise.all(values.accounts.map(account => (
              this.props.addScheduledPost(account.type, {
                accountId: account.id,
                message: values.message,
                date: values.date,
                imgUrl: values.image,
              })
            )));
            form.reset();
            return results;
          }}
          initialValues={{ accounts: [] }}
        />
      </div>
    );
  }
}

PostForm.propTypes = {
  onSuccess: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  cancelButton: PropTypes.node,
  addScheduledPost: PropTypes.func.isRequired,
  // updateScheduledPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScheduledPost: (type, body) => dispatch(postActions[type].createScheduledPost(body)),
  // updateScheduledPost: (type, id, body) => (
  //   dispatch(postActions[type].updateScheduledPost(id, body))
  // ),
});

export default connect(null, mapDispatchToProps)(PostForm);
