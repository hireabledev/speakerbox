import React, { PropTypes } from 'react';
import cn from 'classnames';
import Icon from '../icon';

export default function FavoriteButton({ onClick }) {
  return (
    <button
      className={cn('sb-post-action')}
      onClick={onClick}
      type="button"
    >
      <Icon name="pencil-square-o" label="pencil" />
      {' '}
      Post
    </button>
  );
}

FavoriteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
