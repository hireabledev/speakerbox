import React, { PropTypes } from 'react';
import Form, { FormGroup, Label, Input } from 'lib/components/form';

export function RawFeedForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" placeholder="Name" required />
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
    </form>
  );
}

RawFeedForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default function FeedForm(props) {
  return (
    <Form
      name="feed"
      component={RawFeedForm}
      onSubmit={(values, _, form) => {
        const res = props.feed
          ? props.updateFeed(props.feed.id, values)
          : props.addFeed(values);
        res.then(() => form.reset());
      }}
      initialValues={props.feed}
    />
  );
}

FeedForm.propTypes = {
  feed: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  addFeed: PropTypes.func.isRequired,
  updateFeed: PropTypes.func.isRequired,
};
