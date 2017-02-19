import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import { updateScheduledPost } from '../../actions/posts';

export function PostDateButton({ disabled, post, onChange }) {
  return (
    <Datetime
      closeOnSelect
      className="sb-post-action"
      dateFormat="ll"
      value={new Date(post.date)}
      onChange={(date) => onChange(post.id, date.toISOString())}
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
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onChange: (id, date) => dispatch(updateScheduledPost(id, { date })),
});

export default connect(null, mapDispatchToProps)(PostDateButton);
