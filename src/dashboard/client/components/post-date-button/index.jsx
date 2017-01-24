import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import * as postActions from '../../actions/posts';

export function PostDateButton({ disabled, post, onChange }) {
  return (
    <Datetime
      closeOnSelect
      className="sb-post-action"
      dateFormat="ll"
      value={new Date(post.date)}
      onChange={(date) => onChange(post.id, post.type, date.toISOString())}
      isValidDate={m => m.isAfter(new Date())}
      inputProps={{ disabled }}
    />
  );
}

PostDateButton.propTypes = {
  disabled: PropTypes.bool,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onChange: (id, type, date) => {
    if (type === 'retweet') {
      return dispatch(postActions.twitter.updateScheduledRetweet(id, { date }));
    }
    return dispatch(postActions[type].updateScheduledPost(id, { date }));
  },
});

export default connect(null, mapDispatchToProps)(PostDateButton);
