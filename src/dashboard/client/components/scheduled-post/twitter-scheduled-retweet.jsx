import React, { PropTypes } from 'react';
import cn from 'classnames';
import PostTypeLabel from '../post-type-label';
import PostTextarea from '../post-textarea';
import PostActions from '../post-actions';
import PostRemoveButton from '../post-remove-button';
import PostDateButton from '../post-date-button';
import PostViewLink from '../post-view-link';

export default function ScheduledRetweet({ post }) {
  return (
    <article
      className={cn('sb-post sb-scheduled-post', {
        'sb-scheduled-post-posted': post.posted,
      })}
    >
      <div className="sb-post-body">
        <div className="sb-post-container">
          <PostTypeLabel type="twitter" accountId={post.accountId} />
          <PostTextarea post={post.twitterPost} disabled />
        </div>
      </div>
      <PostActions>
        <PostDateButton post={post} disabled={!!post.posted} />
        {post.url && <PostViewLink url={post.url} />}
        <PostActions.Secondary>
          <PostRemoveButton post={post} />
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
};
