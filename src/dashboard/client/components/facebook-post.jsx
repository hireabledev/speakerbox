import React, { PropTypes } from 'react';
import DisplayDate from './display-date';
import PostAuthor from './post-author';
import PostMeta from './post-meta';

export default function FacebookPost({ post }) {
  return (
    <article className="post">
      <div className="post-body">
        <PostAuthor name={post.authorName} url={post.authorUrl} imgUrl={post.authorImgUrl} />
        <div className="post-container">
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
              <DisplayDate className="post-date" date={post.date} />
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
