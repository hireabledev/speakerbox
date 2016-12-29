import React, { PropTypes } from 'react';

export default function Fallback(props) {
  if (props.if) {
    return (
      <p className="fallback">
        {props.children}
      </p>
    );
  }
  return null;
}

Fallback.propTypes = {
  children: PropTypes.node,
  if: PropTypes.any,
};
