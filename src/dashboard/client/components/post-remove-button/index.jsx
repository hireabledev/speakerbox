import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'lib/client/components/icon';
import { removeScheduledPost } from '../../actions/posts';

export function PostRemoveButton({ post, onClick }) {
  return (
    <button
      className="sb-post-action"
      onClick={() => onClick(post)}
      type="button"
    >
      <Icon name="trash-o" label="trash" />
      {' '}
      Delete
    </button>
  );
}

PostRemoveButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToPros = (dispatch, ownProps) => ({
  onClick: async (post) => {
    const { id } = post;
    await dispatch(removeScheduledPost(id));
    if (ownProps.onClick) {
      ownProps.onClick(post);
    }
  },
});

export default connect(null, mapDispatchToPros)(PostRemoveButton);
