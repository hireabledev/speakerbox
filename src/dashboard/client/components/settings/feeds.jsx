import React, { Component, PropTypes } from 'react';
import { PageTitle } from 'lib/components/page';

function FeedItem({ feed, remove }) {
  return (
    <tr>
      <td>{feed.name}</td>
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
  remove: PropTypes.func.isRequired,
};

export default class SettingsFeedsPage extends Component {
  componentDidMount() {
  }

  render() {
    const { feeds, removeFeed } = this.props;
    return (
      <div>
        <PageTitle>Feeds</PageTitle>
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
              <FeedItem key={feed.id} feed={feed} remove={removeFeed} />
            ))}
          </tbody>
        </table>
        {/* <a className="btn btn-primary" href="/sso">Add Feed</a> */}
      </div>
    );
  }
}

SettingsFeedsPage.propTypes = {
  feeds: PropTypes.array.isRequired,
  removeFeed: PropTypes.func.isRequired,
};
