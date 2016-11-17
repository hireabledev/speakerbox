import React, { PropTypes } from 'react';

export default function PostAuthorImg({ children, name, url, imgUrl }) {
  return (
    <a className="post-author-img-url" href={url} rel="noopener noreferrer" target="_blank">
      <img className="post-author-img" src={imgUrl} alt={name} title={name} />
      {children}
    </a>
  );
}

PostAuthorImg.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};
