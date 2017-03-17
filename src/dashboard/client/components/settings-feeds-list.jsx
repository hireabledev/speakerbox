import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import cn from 'classnames';
import { PageTitle } from 'lib/client/components/page';
import If from 'lib/client/components/if';
import { removeFeed } from '../actions/feeds';
import FeedForm from './feed-form';

const MAX_FEEDS = 2;

function FeedItem({ feed, onClick, remove }) {
  return (
    <tr>
      <td>
        <a onClick={onClick} href={`#${feed.id}`} role="button">
          {feed.name}
        </a>
      </td>
      <td>{feed.url}</td>
      <td>{feed.id}</td>
      <td>
        <button className="btn btn-sm btn-danger" type="button" onClick={() => remove(feed.id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}

FeedItem.propTypes = {
  feed: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export class SettingsFeedsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedFormVisible: false,
      editFeed: null,
    };
    this.cancelFeedForm = this.cancelFeedForm.bind(this);
    this.editFeed = this.editFeed.bind(this);
  }

  cancelFeedForm() {
    this.setState({
      feedFormVisible: false,
      editFeed: null,
    });
  }

  editFeed(feed) {
    this.setState({
      feedFormVisible: true,
      editFeed: feed,
    });
  }

  render() {
    const { feeds } = this.props;

    return (
      <div>
        <PageTitle
          flush={this.state.feedFormVisible === false}
        >
          {this.state.feedFormVisible ? 'Edit Feed' : 'Feeds'}
        </PageTitle>
        <If falsy={this.state.feedFormVisible}>
          <div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>ID</th>
                    <th><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {feeds.map(feed => (
                    <FeedItem
                      key={feed.id}
                      feed={feed}
                      onClick={e => {
                        e.preventDefault();
                        this.editFeed(feed);
                      }}
                      remove={this.props.removeFeed}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              to="/settings/feeds/new"
              className={cn('btn btn-primary', {
                disabled: feeds.length >= MAX_FEEDS,
              })}
            >
              Add Feed
            </Link>
            {feeds.length >= MAX_FEEDS && (
              <span className="text-muted">
                {'\u00a0\u00a0\u00a0'}
                You can only add {MAX_FEEDS} feeds.
              </span>
            )}
          </div>
        </If>
        <If truthy={this.state.feedFormVisible}>
          <FeedForm
            feed={this.state.editFeed}
            onSuccess={() => this.cancelFeedForm()}
            cancelButton={(
              <button
                onClick={() => this.cancelFeedForm()}
                className="btn btn-secondary"
                type="button"
              >
                Cancel
              </button>
            )}
          />
        </If>
      </div>
    );
  }
}

SettingsFeedsListPage.propTypes = {
  feeds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  removeFeed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  feeds: state.rss.feeds,
});

const mapDispatchToProps = (dispatch) => ({
  removeFeed: id => dispatch(removeFeed(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsFeedsListPage);
