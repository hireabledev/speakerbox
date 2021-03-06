import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import noop from 'lodash/noop';
import pickBy from 'lodash/pickBy';
import Link from 'react-router/lib/Link';
import { IconCheckbox } from 'lib/client/components/checkbox';

function isChecked(accounts, feeds, type, id) {
  return type === 'feeds' ? !!feeds[id] : !!accounts[id];
}

export function AccountList(props) {
  const accountsByType = groupBy(props.accounts, 'type');
  const { feeds, isQueryFiltered, accountVisibility, feedVisibility, showFeeds, pathname } = props;

  if (showFeeds && feeds.length > 0) {
    accountsByType.feeds = feeds;
  }

  const accountList = map(accountsByType, (accounts, type) => (
    accounts.map(account => (
      <AccountListItem
        key={account.id}
        type={type === 'feeds' ? 'feeds' : 'accounts'}
        icon={type === 'feeds' ? 'rss' : `${type}-square`}
        pathname={pathname}
        id={account.id}
        name={account.name || account.id}
        isQueryFiltered={isQueryFiltered}
        accountVisibility={accountVisibility}
        feedVisibility={feedVisibility}
        checked={isChecked(accountVisibility, feedVisibility, type, account.id)}
      />
    ))
  ));

  return (
    <aside className="sb-al-menu">
      <h4 className="sb-al-heading">Accounts</h4>
      <div className="sb-divider" />
      <ul className="sb-al-list">
        {accountList}
      </ul>
    </aside>
  );
}

AccountList.propTypes = {
  pathname: PropTypes.string.isRequired,
  isQueryFiltered: PropTypes.bool.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  accountVisibility: PropTypes.object,
  feeds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  feedVisibility: PropTypes.object,
  showFeeds: PropTypes.bool,
};

AccountList.defaultProps = {
  accountVisibility: {},
  feedVisibility: {},
  showFeeds: true,
};

function AccountListItem(props) {
  const { type, pathname, id, accountVisibility, feedVisibility } = props;

  let accounts = { ...accountVisibility };
  let feeds = { ...feedVisibility };

  if (type === 'accounts') {
    accounts[id] = !props.checked;
  } else if (type === 'feeds') {
    feeds[id] = !props.checked;
  }

  accounts = Object.keys(pickBy(accounts, account => (account === true)));
  feeds = Object.keys(pickBy(feeds, feed => (feed === true)));

  const allAccountsEnabled = accounts.length === Object.keys(accountVisibility).length;
  const allFeedsEnabled = feeds.length === Object.keys(feedVisibility).length;

  if (allAccountsEnabled && allFeedsEnabled) {
    accounts = undefined;
    feeds = undefined;
  }

  const to = {
    pathname,
    query: { accounts, feeds },
  };

  return (
    <li className="sb-al-item">
      <Link className="sb-al-link" to={to}>
        <IconCheckbox
          checked={props.checked}
          icon={props.icon}
          onChange={noop}
          label={props.name}
        />
      </Link>
    </li>
  );
}

AccountListItem.propTypes = {
  type: PropTypes.oneOf(['accounts', 'feeds']).isRequired,
  pathname: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  accountVisibility: PropTypes.object.isRequired,
  feedVisibility: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isQueryFiltered: state.visibility.isQueryFiltered,
  accounts: state.accounts.accounts,
  accountVisibility: state.visibility.accountVisibility,
  feeds: state.rss.feeds,
  feedVisibility: state.visibility.feedVisibility,
});

export default connect(mapStateToProps)(AccountList);
