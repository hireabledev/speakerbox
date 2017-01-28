import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Icon from 'lib/client/components/icon';
import * as postActions from '../../actions/posts';

export function PostFavoriteButton({ post, onClick }) {
  return (
    <button
      className={cn('sb-post-action', {
        active: post.favorited,
      })}
      onClick={() => onClick(post.id, post.favorited, post.type)}
      type="button"
    >
      <Icon name={post.favorited ? 'star' : 'star-o'} label="star" />
      {' '}
      Favorite
    </button>
  );
}

PostFavoriteButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    favorited: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToPros = dispatch => ({
  onClick: (id, favorited, type) => dispatch(postActions[type].toggleFavoritePost(id, favorited)),
});

export default connect(null, mapDispatchToPros)(PostFavoriteButton);
