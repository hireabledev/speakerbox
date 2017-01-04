import React, { PropTypes } from 'react';
import cn from 'classnames';
import PostTypeLabel from '../post-type-label';
import PostTextarea from '../post-textarea';
import PostImg from '../post-img';

export default function Post({ post, actions }) {
  const disabled = !!post.url;
  return (
    <article
      className={cn('sb-post sb-scheduled-post', {
        'sb-scheduled-post-posted': post.posted,
      })}
    >
      <div className="sb-post-body">
        <div className="sb-post-container">
          <PostTypeLabel type={post.type} accountId={post.accountId} feedId={post.feedId} />
          <PostTextarea post={post} disabled={disabled} />
          {(!disabled || post.imgUrl) && <PostImg post={post} disabled={!!post.url} />}
        </div>
      </div>
      {actions}
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    type: PropTypes.oneOf(['facebook', 'twitter', 'linkedin']).isRequired,
    imgUrl: PropTypes.string,
    body: PropTypes.string,
    comment: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.date,
    posted: PropTypes.date,
  }).isRequired,
  actions: PropTypes.node,
};
