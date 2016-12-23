import React, { PropTypes } from 'react';
import cn from 'classnames';

export default function PostMeta({ children, position }) {
  return (
    <div className={cn('sb-post-meta', `post-meta-${position}`)}>
      {children}
    </div>
  );
}

export function PostMetaPrimary({ children }) {
  return (
    <div className="sb-post-meta-primary">
      {children}
    </div>
  );
}

export function PostMetaSecondary({ children }) {
  return (
    <div className="sb-post-meta-secondary">
      {children}
    </div>
  );
}

PostMeta.Primary = PostMetaPrimary;
PostMeta.Secondary = PostMetaSecondary;

const propTypes = {
  children: PropTypes.node,
};

PostMeta.propTypes = {
  ...propTypes,
  position: PropTypes.oneOf(['top', 'bottom']),
};

PostMeta.defaultProps = {
  position: 'bottom',
};

PostMetaPrimary.propTypes = propTypes;
PostMetaSecondary.propTypes = propTypes;
