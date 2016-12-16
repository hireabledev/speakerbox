import React, { PropTypes } from 'react';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import noop from 'lodash/noop';
import pickBy from 'lodash/pickBy';
import Link from 'react-router/lib/Link';

function AccountListItem(props) {
  const { type, id, name, accountVisibility, feedVisibility } = props;
  let accounts = { ...accountVisibility };
  let feeds = { ...feedVisibility };
  if (type === 'accounts') {
    accounts[id] = !props.checked;
  } else if (type === 'feeds') {
    feeds[id] = !props.checked;
  }
  accounts = Object.keys(pickBy(accounts, account => (account === true)));
  feeds = Object.keys(pickBy(feeds, feed => (feed === true)));
  if (accounts.length === Object.keys(accountVisibility).length) {
    accounts = undefined;
  }
  if (feeds.length === Object.keys(feedVisibility).length) {
    feeds = undefined;
  }
  const to = {
    pathname: '/stream',
    query: { accounts, feeds },
  };
  return (
    <li>
      <Link to={to}>
        <span className="checkbox">
          <input
            type="checkbox"
            checked={props.checked}
            onChange={noop}
          /> {name}
        </span>
      </Link>
    </li>
  );
}

AccountListItem.propTypes = {
  type: PropTypes.oneOf(['accounts', 'feeds']).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  accountVisibility: PropTypes.object.isRequired,
  feedVisibility: PropTypes.object.isRequired,
};

export default function AccountList(props) {
  const accountsByType = groupBy(props.accounts, 'type');
  const { feeds, accountVisibility, feedVisibility } = props;
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
              <AccountListItem
                key={account.id}
                type="accounts"
                id={account.id}
                name={account.id}
                accountVisibility={accountVisibility}
                feedVisibility={feedVisibility}
                checked={!!accountVisibility[account.id]}
              />
            ))}
          </ul>
        </div>
      ))}
      <p className="menu-label">
        Feeds
      </p>
      <ul className="menu-list">
        {feeds.map(feed => (
          <AccountListItem
            key={feed.id}
            type="feeds"
            id={feed.id}
            name={feed.id}
            accountVisibility={accountVisibility}
            feedVisibility={feedVisibility}
            checked={!!feedVisibility[feed.id]}
          />
        ))}
      </ul>
    </aside>
  );
}

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  accountVisibility: PropTypes.object,
  feeds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  feedVisibility: PropTypes.object,
};

AccountList.defaultProps = {
  accountVisibility: {},
  feedVisibility: {},
};
