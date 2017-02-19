import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import cn from 'classnames';
import some from 'lodash/some';
import throttle from 'lodash/throttle';
import { getTweetLength } from 'twitter-text';
import Form, { FormGroup, Label, Textarea, Datetime, AccountSelect, ImagePicker } from 'lib/client/components/form';
import { createScheduledPost } from '../../actions/posts';

const FORM_NAME = 'scheduledPost';

export class RawPostForm extends Component {
  componentDidMount() {
    if (this.props.initialValues.message) {
      this.messageInput.focus();
    }
  }

  render() {
    const resetButton = (
      <Link
        to="/schedule"
        className="btn btn-secondary"
        onClick={() => this.props.reset()}
      >
        Cancel
      </Link>
    );
    return (
      <form name={this.props.name} onSubmit={this.props.handleSubmit}>
        <FormGroup name="message">
          <Label srOnly>Message</Label>
          <Textarea
            getRef={input => { this.messageInput = input; }}
            placeholder="What do you want to share?"
            onFocus={() => this.props.touch('message')}
            onBlur={(e) => {
              if (this.props.pristine && e.target.value === '') {
                this.props.reset();
              }
            }}
            required
          />
        </FormGroup>
        <div className={cn({ 'hidden-xs-up': this.props.pristine && this.props.anyTouched === false })}>
          <FormGroup name="date">
            <Label srOnly>Date</Label>
            <Datetime required afterToday />
          </FormGroup>
          <FormGroup name="accounts">
            <Label srOnly>Accounts</Label>
            <AccountSelect required />
          </FormGroup>
          <FormGroup name="imgUrl">
            <Label srOnly>Image</Label>
            <ImagePicker required />
          </FormGroup>
          <button
            className="btn btn-primary"
            disabled={this.props.pristine || this.props.submitting}
            type="submit"
          >
            Save
          </button>
          {' '}
          {this.props.cancelButton || resetButton}
        </div>
      </form>
    );
  }
}

RawPostForm.propTypes = {
  initialValues: PropTypes.shape({
    message: PropTypes.string,
  }),
  name: PropTypes.string,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  touch: PropTypes.func,
  anyTouched: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  cancelButton: PropTypes.node,
};

const validate = throttle((values) => {
  const errors = {};
  const message = values.message;
  if (message && some(values.accounts, { type: 'twitter' }) && getTweetLength(message) > 140) {
    errors.message = `Message too long for Twitter account. ${message.length}/140`;
  }
  return errors;
}, 800);

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
              this.props.addScheduledPost({
                accountId: account.id,
                message: values.message,
                date: values.date,
                imgUrl: values.imgUrl,
              })
            )));
            form.reset();
            return results;
          }}
          initialValues={{ message: this.props.message, accounts: this.props.accounts }}
          validate={validate}
        />
      </div>
    );
  }
}

PostForm.propTypes = {
  onSuccess: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  cancelButton: PropTypes.node,
  addScheduledPost: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.object),
  message: PropTypes.string,
};

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
});

const mapDispatchToProps = (dispatch) => ({
  addScheduledPost: (body) => dispatch(createScheduledPost(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
