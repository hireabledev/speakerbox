import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { updateScheduledPost } from '../../actions/posts';

export function PostTextarea({ disabled, post, onChange }) {
  const debouncedOnChange = debounce(value => {
    if (value) {
      onChange(post.id, value);
    }
  }, 1000);
  return (
    <textarea
      className="sb-post-textarea"
      defaultValue={post.message || post.comment}
      onChange={e => debouncedOnChange(e.target.value)}
      disabled={disabled}
    />
  );
}

PostTextarea.propTypes = {
  disabled: PropTypes.bool,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToPros = dispatch => ({
  onChange: (id, message) => dispatch(updateScheduledPost(id, { message })),
});

export default connect(null, mapDispatchToPros)(PostTextarea);
