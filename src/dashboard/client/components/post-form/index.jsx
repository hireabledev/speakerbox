import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import some from 'lodash/some';
import throttle from 'lodash/throttle';
import Form, { FormGroup, Label, Textarea, Datetime, AccountSelect, ImagePicker } from 'lib/components/form';
import * as postActions from '../../actions/posts';

const FORM_NAME = 'scheduledPost';

export function RawPostForm(props) {
  const resetButton = (
    <button
      className="btn btn-secondary"
      type="button"
      onClick={() => props.reset()}
    >
      Cancel
    </button>
  );
  return (
    <form name={props.name} onSubmit={props.handleSubmit}>
      <FormGroup name="message">
        <Label srOnly>Message</Label>
        <Textarea
          placeholder="What do you want to share?"
          onFocus={() => props.touch('message')}
          onBlur={(e) => {
            if (props.pristine && e.target.value === '') {
              props.reset();
            }
          }}
          required
        />
      </FormGroup>
      <div className={cn({ 'hidden-xs-up': props.pristine && props.anyTouched === false })}>
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
          disabled={props.pristine || props.submitting}
          type="submit"
        >
          Save
        </button>
        {' '}
        {props.cancelButton || resetButton}
      </div>
    </form>
  );
}

RawPostForm.propTypes = {
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
  if (message && message.length > 140 && some(values.accounts, { type: 'twitter' })) {
    errors.message = `Message too long for Twitter account. ${message.length}/140`;
  }
  return errors;
}, 500);

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
                imgUrl: values.imgUrl,
              })
            )));
            form.reset();
            return results;
          }}
          initialValues={{ accounts: this.props.accounts }}
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
};

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
});

const mapDispatchToProps = (dispatch) => ({
  addScheduledPost: (type, body) => dispatch(postActions[type].createScheduledPost(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
