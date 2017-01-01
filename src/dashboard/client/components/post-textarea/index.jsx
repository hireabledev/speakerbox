import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import * as postActions from '../../actions/posts';

export function PostTextarea({ post, onChange }) {
  const debouncedOnChange = debounce(value => {
    if (value) {
      onChange(post.id, post.type, value);
    }
  }, 1000);
  return (
    <textarea
      className="sb-post-textarea"
      defaultValue={post.body || post.message || post.comment}
      onChange={e => debouncedOnChange(e.target.value)}
    />
  );
}

PostTextarea.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToPros = dispatch => ({
  onChange: (id, type, message) => dispatch(postActions[type].updateScheduledPost(id, { message })),
});

export default connect(null, mapDispatchToPros)(PostTextarea);
