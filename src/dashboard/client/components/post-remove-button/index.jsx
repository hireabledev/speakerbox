import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'lib/components/icon';
import history from '../../history';
import * as postActions from '../../actions/posts';

export function PostRemoveButton({ post, onClick }) {
  return (
    <button
      className="sb-post-action"
      onClick={() => onClick(post.id, post.type)}
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

const mapDispatchToPros = dispatch => ({
  onClick: async (id, type) => {
    if (type === 'retweet') {
      await dispatch(postActions.twitter.removeScheduledRetweet(id));
    } else {
      await dispatch(postActions[type].removeScheduledPost(id));
    }
    history.push('/schedule');
  },
});

export default connect(null, mapDispatchToPros)(PostRemoveButton);
