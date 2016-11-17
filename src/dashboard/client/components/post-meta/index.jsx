import React, { PropTypes } from 'react';

export default function PostMeta({ children }) {
  return (
    <div className="post-meta">
      {children}
    </div>
  );
}

export function PostMetaPrimary({ children }) {
  return (
    <div className="post-meta-primary">
      {children}
    </div>
  );
}

export function PostMetaSecondary({ children }) {
  return (
    <div className="post-meta-secondary">
      {children}
    </div>
  );
}

PostMeta.Primary = PostMetaPrimary;
PostMeta.Secondary = PostMetaSecondary;

const propTypes = {
  children: PropTypes.node,
};

PostMeta.propTypes = propTypes;
PostMetaPrimary.propTypes = propTypes;
PostMetaSecondary.propTypes = propTypes;
