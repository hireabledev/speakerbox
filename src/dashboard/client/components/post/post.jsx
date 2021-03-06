import React, { PropTypes } from 'react';
import Linkify from 'react-linkify';
import DisplayDate from 'lib/client/components/display-date';
import PostTypeLabel from '../post-type-label';
import PostAuthor from '../post-author';
import PostAuthorImg from '../post-author-img';
import PostMeta from '../post-meta';

export default function Post({ post, actions, waypoint }) {
  return (
    <article className="sb-post">
      <div className="sb-post-body">
        {waypoint}
        <PostMeta position="top">
          <PostMeta.Primary>
            {post.authorImgUrl && (
              <PostAuthorImg
                name={post.authorName}
                url={post.authorUrl}
                imgUrl={post.authorImgUrl}
              />
            )}
            <div>
              {post.authorName && post.authorUrl && (
                <PostAuthor name={post.authorName} url={post.authorUrl} />
              )}
              <DisplayDate className="sb-post-date" date={post.date} />
            </div>
          </PostMeta.Primary>
          <PostMeta.Secondary>
            <PostTypeLabel type={post.type} accountId={post.accountId} feedId={post.feedId} />
          </PostMeta.Secondary>
        </PostMeta>
        <p className="sb-post-content">
          {post.title && (
            <h1 className="sb-post-title">{post.title}</h1>
          )}
          <Linkify properties={{ target: '_blank', rel: 'noopener noreferrer' }}>
            {post.message}
          </Linkify>
        </p>
      </div>
      {actions}
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    type: PropTypes.oneOf(['facebook', 'twitter', 'linkedin', 'rss']).isRequired,
    comment: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    date: PropTypes.date,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
  }).isRequired,
  actions: PropTypes.node,
  waypoint: PropTypes.node,
};
