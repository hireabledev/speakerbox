import React, { PropTypes } from 'react';

export default function TwitterPost({ post }) {
  return (
    <article className="post">
      <h1 className="post-id">
        {post.id}
      </h1>
      <p className="post-body">
        {post.body}
      </p>
      <p className="post-date">
        {post.date}
      </p>
    </article>
  );
}

TwitterPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.date,
  }),
};
