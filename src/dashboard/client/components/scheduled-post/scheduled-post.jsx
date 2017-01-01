import React, { PropTypes } from 'react';
import PostTypeLabel from '../post-type-label';
import PostTextarea from '../post-textarea';
import PostImg from '../post-img';

export default function Post({ post, actions }) {
  return (
    <article className="sb-post sb-scheduled-post">
      <div className="sb-post-body">
        <div className="sb-post-container">
          <PostTypeLabel type={post.type} accountId={post.accountId} feedId={post.feedId} />
          <PostTextarea post={post} />
          <PostImg post={post} />
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
  }).isRequired,
  actions: PropTypes.node,
};
