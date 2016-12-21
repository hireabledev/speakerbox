import React, { PropTypes } from 'react';

export default function PostAuthor({ children, name, url }) {
  return (
    <a className="sb-post-author-url" href={url} rel="noopener noreferrer" target="_blank">
      <span className="sb-post-author-name">{name}</span>
      {children}
    </a>
  );
}

PostAuthor.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
