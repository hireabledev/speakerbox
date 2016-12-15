import React, { PropTypes } from 'react';

export function PostActions({ children }) {
  return (
    <div className="post-actions">
      {children}
    </div>
  );
}

PostActions.propTypes = {
  children: PropTypes.node,
};

export function PostAction(props) {
  return (
    <a className="post-action" role="button" {...props}>
      {props.children}
    </a>
  );
}

PostAction.propTypes = {
  children: PropTypes.node,
};
