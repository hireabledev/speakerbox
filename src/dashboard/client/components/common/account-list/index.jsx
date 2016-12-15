import React, { PropTypes } from 'react';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import Link from 'react-router/lib/Link';

export default function AccountList(props) {
  const accountsByType = groupBy(props.accounts, 'type');
  const feeds = props.feeds;
  return (
    <aside className="menu" style={{ marginTop: 23 }}>
      {map(accountsByType, (accounts, type) => (
        <div key={type}>
          <div />
          <p className="menu-label">
            {type}
          </p>
          <ul className="menu-list">
            {accounts.map(account => (
              <li key={account.id}>
                <Link to={{ pathname: '/stream', query: { [`${type}Accounts`]: account.id } }}>
                  {account.type}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="menu-label">
        Feeds
      </p>
      <ul className="menu-list">
        {feeds.map(feed => (
          <li key={feed.id}>
            <Link to={{ pathname: '/stream', query: { feeds: feed.id } }}>
              {feed.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  feeds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
};
