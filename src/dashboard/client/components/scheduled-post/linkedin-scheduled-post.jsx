import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import ScheduledPost from './scheduled-post';
import PostActions from '../post-actions';
import PostRemoveButton from '../post-remove-button';
import PostDateButton from '../post-date-button';
import PostViewLink from '../post-view-link';

export default function LinkedinPost({ post, onRemove, waypoint }) {
  return (
    <ScheduledPost
      post={post}
      waypoint={waypoint}
      actions={(
        <PostActions>
          <PostDateButton post={post} disabled={!!post.posted} />
          {post.url && <PostViewLink url={post.url} />}
          <PostActions.Secondary>
            <PostRemoveButton post={post} onClick={onRemove} />
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
  waypoint: PropTypes.node,
  onRemove: PropTypes.func,
};

LinkedinPost.defaultProps = {
  onRemove: noop,
};
