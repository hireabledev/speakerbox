import React, { PropTypes } from 'react';
import DisplayDate from '../display-date';
import PostAuthor from './author';
import PostAuthorImg from './author-img';
import PostMeta from './meta';

export default function Post({ post, actions }) {
  return (
    <article className="sb-post">
      <div className="sb-post-body">
        <div className="sb-post-container">
          <PostMeta position="top">
            {post.authorImgUrl && (
              <PostMeta.Primary>
                <PostAuthorImg
                  name={post.authorName}
                  url={post.authorUrl}
                  imgUrl={post.authorImgUrl}
                />
              </PostMeta.Primary>
            )}
            <PostMeta.Primary>
              {post.authorName && post.authorUrl && (
                <PostAuthor name={post.authorName} url={post.authorUrl} />
              )}
              <DisplayDate className="sb-post-date" date={post.date} />
            </PostMeta.Primary>
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
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
  }).isRequired,
  actions: PropTypes.node,
};
