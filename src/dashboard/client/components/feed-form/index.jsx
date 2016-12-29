import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Form, { FormGroup, Label, Input } from 'lib/components/form';
import { addFeed, updateFeed } from '../../actions/feeds';

export function RawFeedForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" placeholder="My Feed" required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="url">URL</Label>
        <Input type="text" name="url" placeholder="https://www.example.com/feed" required />
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

RawFeedForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  cancelButton: PropTypes.node,
};

export function FeedForm(props) {
  return (
    <Form
      name="feed"
      component={RawFeedForm}
      cancelButton={props.cancelButton}
      onSubmit={(values, _, form) => {
        const res = props.feed
          ? props.updateFeed(props.feed.id, values)
          : props.addFeed(values);
        res.then(feed => {
          form.reset();
          if (props.onSuccess) { props.onSuccess(feed); }
        });
      }}
      initialValues={props.feed}
    />
  );
}

FeedForm.propTypes = {
  onSuccess: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  cancelButton: PropTypes.node,
  feed: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  addFeed: PropTypes.func.isRequired,
  updateFeed: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addFeed: body => dispatch(addFeed(body)),
  updateFeed: (id, body) => dispatch(updateFeed(id, body)),
});

export default connect(null, mapDispatchToProps)(FeedForm);
