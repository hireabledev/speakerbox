import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

export function PostTypeLabel({ type, accountId, accountsById, feedId, feedsById }) {
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

PostTypeLabel.propTypes = {
  type: PropTypes.string.isRequired,
  accountId: PropTypes.string,
  accountsById: PropTypes.object,
  feedId: PropTypes.string,
  feedsById: PropTypes.object,
};

const mapStateToProps = (state) => ({
  accountsById: state.accounts.accountsById,
  feedsById: state.rss.feedsById,
});

export default connect(mapStateToProps)(PostTypeLabel);
