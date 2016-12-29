import React, { PropTypes } from 'react';
import TypeLabel from '../../containers/post/type-label';
import DisplayDate from '../display-date';
import PostAuthor from './author';
import PostAuthorImg from './author-img';
import PostMeta from './meta';

export default function Post({ type, post, actions }) {
  return (
    <article className="sb-post">
      <div className="sb-post-body">
        <div className="sb-post-container">
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
              <TypeLabel type={type} accountId={post.accountId} feedId={post.feedId} />
            </PostMeta.Secondary>
          </PostMeta>
          <p className="sb-post-content">
            {post.body}
          </p>
        </div>
      </div>
      {actions}
    </article>
  );
}

Post.propTypes = {
  type: PropTypes.oneOf(['facebook', 'twitter', 'linkedin', 'rss']).isRequired,
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
  }).isRequired,
  actions: PropTypes.node,
};
