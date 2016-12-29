import React, { PropTypes } from 'react';
import cn from 'classnames';

export default function TypeLabel({ type, accountId, accountsById, feedId, feedsById }) {
  const account = accountsById[accountId];
  const feed = feedsById[feedId];
  return (
    <div
      className={cn('sb-post-type', `sb-post-type-${type}`)}
      title={(account && account.name) || (feed && feed.name)}
    >
      {type}
    </div>
  );
}

TypeLabel.propTypes = {
  type: PropTypes.string.isRequired,
  accountId: PropTypes.string,
  accountsById: PropTypes.object,
  feedId: PropTypes.string,
  feedsById: PropTypes.object,
};
