import React, { PropTypes } from 'react';

export default function PostActions(props) {
  return (
    <div className="sb-post-actions">
      {props.children}
    </div>
  );
}

PostActions.propTypes = {
  children: PropTypes.node,
};

export function PostActionsSecondary(props) {
  return (
    <div className="sb-post-actions-secondary">
      {props.children}
    </div>
  );
}

PostActionsSecondary.propTypes = {
  children: PropTypes.node,
};

PostActions.Secondary = PostActionsSecondary;
