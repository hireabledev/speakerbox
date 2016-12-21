import React, { PropTypes } from 'react';
import DisplayDate from '../display-date';
import PostMeta from '../post-meta';

export default function RSSPost({ post }) {
  return (
    <article className="sb-post">
      <div className="sb-post-body">
        <div className="sb-post-container">
          <PostMeta position="top">
            <PostMeta.Primary>
              <DisplayDate className="sb-post-date" date={post.date} />
            </PostMeta.Primary>
          </PostMeta>
          <p className="sb-post-content">
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

RSSPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
  }),
};
