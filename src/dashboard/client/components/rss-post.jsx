import React, { PropTypes } from 'react';
import DisplayDate from './display-date';
import PostMeta from './post-meta';

export default function RSSPost({ post }) {
  return (
    <article className="post">
      <div className="post-body">
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

RSSPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
  }),
};
