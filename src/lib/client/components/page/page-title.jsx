import React, { PropTypes } from 'react';
import cn from 'classnames';

export default function PageTitle({ children, flush }) {
  return (
    <h1
      className={cn('sb-page-title', {
        'sb-page-title-is-flush': flush,
      })}
    >
      {children}
    </h1>
  );
}

PageTitle.propTypes = {
  children: PropTypes.node,
  flush: PropTypes.bool,
};
