import React, { PropTypes } from 'react';
import ScheduledPost from './scheduled-post';
import PostActions from '../post-actions';
import PostRemoveButton from '../post-remove-button';
import PostDateButton from '../post-date-button';

export default function LinkedinPost({ post }) {
  return (
    <ScheduledPost
      post={post}
      actions={(
        <PostActions>
          <PostDateButton post={post} />
          <PostActions.Secondary>
            <PostRemoveButton post={post} />
          </PostActions.Secondary>
        </PostActions>
      )}
    />
  );
}

LinkedinPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    body: PropTypes.string,
    message: PropTypes.string,
    comment: PropTypes.string,
    date: PropTypes.date,
  }).isRequired,
};
