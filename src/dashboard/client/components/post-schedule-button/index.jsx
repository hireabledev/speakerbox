import React, { PropTypes } from 'react';
import cn from 'classnames';
import Link from 'react-router/lib/Link';
import Icon from 'lib/client/components/icon';

export default function PostScheduleButton({ post }) {
  return (
    <Link
      to={{
        pathname: '/schedule',
        query: {
          message: post.message,
        },
      }}
      className={cn('sb-post-action')}
    >
      <Icon name="pencil-square-o" label="pencil" />
      {' '}
      Post
    </Link>
  );
}

PostScheduleButton.propTypes = {
  post: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};
