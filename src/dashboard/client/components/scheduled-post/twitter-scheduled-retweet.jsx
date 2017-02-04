import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import cn from 'classnames';
import Linkify from 'react-linkify';
import Icon from 'lib/client/components/icon';
import DisplayDate from 'lib/client/components/display-date';
import PostTypeLabel from '../post-type-label';
import PostAuthor from '../post-author';
import PostAuthorImg from '../post-author-img';
import PostMeta from '../post-meta';
import PostActions from '../post-actions';
import PostRemoveButton from '../post-remove-button';
import PostDateButton from '../post-date-button';
import PostViewLink from '../post-view-link';

export default function ScheduledRetweet({ post, onRemove, waypoint }) {
  const twitterPost = post.post;
  return (
    <article
      className={cn('sb-post sb-scheduled-post', {
        'sb-scheduled-post-posted': post.posted,
      })}
    >
      {waypoint}
      <div className="sb-post-body">
        <PostMeta position="top">
          <PostMeta.Primary>
            {twitterPost.authorImgUrl && (
              <PostAuthorImg
                name={twitterPost.authorName}
                url={twitterPost.authorUrl}
                imgUrl={twitterPost.authorImgUrl}
              />
            )}
            <div>
              {twitterPost.authorName && twitterPost.authorUrl && (
                <PostAuthor name={twitterPost.authorName} url={twitterPost.authorUrl} />
              )}
              <DisplayDate className="sb-post-date" date={twitterPost.date} />
            </div>
          </PostMeta.Primary>
          <PostMeta.Secondary>
            <PostTypeLabel type="twitter" accountId={post.accountId}>
              <Icon name="retweet" label="retweet" /> Twitter
            </PostTypeLabel>
          </PostMeta.Secondary>
        </PostMeta>
        <div className="sb-post-content">
          <Linkify properties={{ target: '_blank', rel: 'noopener noreferrer' }}>
            {twitterPost.message}
          </Linkify>
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
    type: PropTypes.oneOf(['twitter']).isRequired,
    date: PropTypes.date,
    posted: PropTypes.date,
  }).isRequired,
  onRemove: PropTypes.func,
  waypoint: PropTypes.node,
};

ScheduledRetweet.defaultProps = {
  onRemove: noop,
};
