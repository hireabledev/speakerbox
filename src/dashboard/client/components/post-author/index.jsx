import React, { PropTypes } from 'react';

export default function PostAuthor({ children, name, url, imgUrl }) {
  return (
    <a className="post-author" href={url} rel="noopener noreferrer" target="_blank">
      <img className="post-author-img" src={imgUrl} alt={name} title={name} />
      {children}
    </a>
  );
}

PostAuthor.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
