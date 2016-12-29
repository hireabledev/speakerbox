import React, { PropTypes } from 'react';
import cn from 'classnames';
import Icon from '../icon';

export default function FavoriteButton({ favorited, onClick }) {
  return (
    <button
      className={cn('sb-post-action', {
        active: favorited,
      })}
      onClick={onClick}
      type="button"
    >
      <Icon name={favorited ? 'star' : 'star-o'} label="star" />
      {' '}
      Favorite
    </button>
  );
}

FavoriteButton.propTypes = {
  favorited: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
