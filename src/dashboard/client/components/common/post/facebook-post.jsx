import React, { PropTypes } from 'react';
import DisplayDate from '../display-date';
import PostAuthor from '../post-author';
import PostAuthorImg from '../post-author-img';
import PostMeta from '../post-meta';

export default function FacebookPost({ post }) {
  return (
    <article className="post">
      <div className="post-body">
        <PostAuthorImg name={post.authorName} url={post.authorUrl} imgUrl={post.authorImgUrl} />
        <div className="post-container">
          <PostMeta position="top">
            <PostMeta.Primary>
              <PostAuthor name={post.authorName} url={post.authorUrl} />
              {' '}
              <DisplayDate className="post-date" date={post.date} />
            </PostMeta.Primary>
          </PostMeta>
          <p className="post-content">
            {post.body}
          </p>
          <PostMeta>
            <PostMeta.Primary>
              {' '}
            </PostMeta.Primary>
            <PostMeta.Secondary>
              <a
                href={post.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                url
              </a>
            </PostMeta.Secondary>
          </PostMeta>
        </div>
      </div>
    </article>
  );
}

FacebookPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
  }),
};
