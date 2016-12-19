import React, { Component, PropTypes } from 'react';
import memoize from 'lodash/memoize';
import Page from './common/page';
import Post from './common/post';
import AccountList from '../containers/common/account-list';

export default class StreamPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    Promise.all([
      this.props.fetchAccounts(),
      this.props.fetchFeeds(),
      this.props.fetchPosts(),
    ]);
  }

  render() {
    const {
      accountVisibility,
      feedVisibility,
      facebookPosts = [],
      moreFacebookPosts,
      twitterPosts = [],
      moreTwitterPosts,
      linkedinPosts = [],
      moreLinkedinPosts,
      rssPosts = [],
      moreRSSPosts,
    } = this.props;

    const morePosts = moreFacebookPosts || moreTwitterPosts || moreLinkedinPosts || moreRSSPosts;

    const filterByAccount = memoize((post) => (accountVisibility[post.accountId]));
    const filterByFeed = memoize((post) => (feedVisibility[post.rssFeedId]));

    return (
      <Page bg="light">
        <div className="container">
          <div className="columns">
            <div className="column">
              {facebookPosts
                .filter(filterByAccount)
                .map(post => <Post key={post.id} post={post} type="facebook" />)}
              {twitterPosts
                .filter(filterByAccount)
                .map(post => <Post key={post.id} post={post} type="twitter" />)}
              {linkedinPosts
                .filter(filterByAccount)
                .map(post => <Post key={post.id} post={post} type="linkedin" />)}
              {rssPosts
                .filter(filterByFeed)
                .map(post => <Post key={post.id} post={post} type="rss" />)}
              {morePosts && <button onClick={this.props.fetchPosts}>Load More</button>}
            </div>
            <div className="column is-one-third">
              <AccountList pathname={this.props.location.pathname} />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

StreamPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  accountVisibility: PropTypes.object,
  feedVisibility: PropTypes.object,
  facebookPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreFacebookPosts: PropTypes.bool.isRequired,
  twitterPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreTwitterPosts: PropTypes.bool.isRequired,
  linkedinPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreLinkedinPosts: PropTypes.bool.isRequired,
  rssPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreRSSPosts: PropTypes.bool.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  fetchFeeds: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};
