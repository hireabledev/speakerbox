import React, { PropTypes } from 'react';
import cn from 'classnames';
import Icon from 'lib/components/icon';

export default function PostScheduleButton({ onClick }) {
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

PostScheduleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
