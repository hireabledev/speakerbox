import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'lib/components/icon';
import * as postActions from '../../actions/posts';

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
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToPros = (dispatch, ownProps) => ({
  onClick: async (post) => {
    const { id, type } = post;
    if (type === 'retweet') {
      await dispatch(postActions.twitter.removeScheduledRetweet(id));
    } else {
      await dispatch(postActions[type].removeScheduledPost(id));
    }
    if (ownProps.onClick) {
      ownProps.onClick(post);
    }
  },
});

export default connect(null, mapDispatchToPros)(PostRemoveButton);
