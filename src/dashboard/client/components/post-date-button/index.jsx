import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import * as postActions from '../../actions/posts';

export function PostDateButton({ post, onChange }) {
  return (
    <Datetime
      className="sb-post-action"
      dateFormat="ll"
      value={new Date(post.date)}
      onChange={(date) => onChange(post.id, post.type, date.toISOString())}
      isValidDate={m => m.isAfter(new Date())}
    >
      Stuff
    </Datetime>
  );
}

PostDateButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToPros = dispatch => ({
  onChange: (id, type, date) => dispatch(postActions[type].updateScheduledPost(id, { date })),
});

export default connect(null, mapDispatchToPros)(PostDateButton);
