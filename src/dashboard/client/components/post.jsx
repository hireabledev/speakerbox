import React, { PropTypes } from 'react';

export default function Post({ post }) {
  return (
    <article className="post">
      <h1 className="post-title">
        {post.title}
      </h1>
      <p className="post-body">
        {post.body}
      </p>
      <p className="post-type">
        <span className="sr-only">Post Type:</span>
        {post.type}
      </p>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    type: PropTypes.oneOf(['rss', 'facebook', 'twitter', 'linkedin']),
  }),
};
