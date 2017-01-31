import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import cn from 'classnames';
import Icon from 'lib/client/components/icon';
import PostTypeLabel from '../post-type-label';
import PostTextarea from '../post-textarea';
import PostActions from '../post-actions';
import PostRemoveButton from '../post-remove-button';
import PostDateButton from '../post-date-button';
import PostViewLink from '../post-view-link';

export default function ScheduledRetweet({ post, onRemove, waypoint }) {
  return (
    <article
      className={cn('sb-post sb-scheduled-post', {
        'sb-scheduled-post-posted': post.posted,
      })}
    >
      {waypoint}
      <div className="sb-post-body">
        <div className="sb-post-container">
          <PostTypeLabel type="twitter" accountId={post.accountId}>
            <Icon name="retweet" label="retweet" /> Twitter
          </PostTypeLabel>
          <PostTextarea post={post.twitterPost} disabled />
        </div>
      </div>
      <PostActions>
        <PostDateButton post={post} disabled={!!post.posted} />
        {post.url && <PostViewLink url={post.url} />}
        <PostActions.Secondary>
          <PostRemoveButton post={post} onClick={onRemove} />
        </PostActions.Secondary>
      </PostActions>
    </article>
  );
}

ScheduledRetweet.propTypes = {
  post: PropTypes.shape({
    type: PropTypes.oneOf(['retweet']).isRequired,
    date: PropTypes.date,
    posted: PropTypes.date,
  }).isRequired,
  onRemove: PropTypes.func,
  waypoint: PropTypes.node,
};

ScheduledRetweet.defaultProps = {
  onRemove: noop,
};
