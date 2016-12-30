import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Form, { FormGroup, Label, Textarea, Datetime } from 'lib/components/form';
import * as postActions from '../../actions/posts';

const FORM_NAME = 'scheduledPost';

export function RawPostForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <Textarea name="message" placeholder="What do you want to share?" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="date">Date</Label>
        <Datetime name="date" placeholder="Select date and time." required afterToday />
      </FormGroup>
      {/* account select */}
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
          onSubmit={(values, _, form) => {
            console.log(values, form);
          }}
        />
      </div>
    );
  }
}

PostForm.propTypes = {
  onSuccess: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  cancelButton: PropTypes.node,
  addScheduledPost: PropTypes.func.isRequired,
  updateScheduledPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScheduledPost: body => dispatch(postActions(body)),
  updateScheduledPost: (id, body) => dispatch(postActions(id, body)),
});

export default connect(null, mapDispatchToProps)(PostForm);
