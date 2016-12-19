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
      this.props.fetchScheduledPosts(),
    ]);
  }

  render() {
    const {
      accountVisibility,
      facebookScheduledPosts = [],
      moreFacebookScheduledPosts,
      twitterScheduledPosts = [],
      moreTwitterScheduledPosts,
      linkedinScheduledPosts = [],
      moreLinkedinScheduledPosts,
    } = this.props;

    const moreScheduledPosts = moreFacebookScheduledPosts || moreTwitterScheduledPosts
      || moreLinkedinScheduledPosts;

    const filterByAccount = memoize((post) => (accountVisibility[post.accountId]));

    return (
      <Page bg="light">
        <div className="container">
          <div className="columns">
            <div className="column">
              {facebookScheduledPosts
                .filter(filterByAccount)
                .map(post => <Post key={post.id} post={post} type="facebook" />)}
              {twitterScheduledPosts
                .filter(filterByAccount)
                .map(post => <Post key={post.id} post={post} type="twitter" />)}
              {linkedinScheduledPosts
                .filter(filterByAccount)
                .map(post => <Post key={post.id} post={post} type="linkedin" />)}
              {moreScheduledPosts && (
                <button onClick={this.props.fetchScheduledPosts}>Load More</button>
              )}
            </div>
            <div className="column is-one-third">
              <AccountList pathname={this.props.location.pathname} showFeeds={false} />
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
  facebookScheduledPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreFacebookScheduledPosts: PropTypes.bool.isRequired,
  twitterScheduledPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreTwitterScheduledPosts: PropTypes.bool.isRequired,
  linkedinScheduledPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreLinkedinScheduledPosts: PropTypes.bool.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  fetchScheduledPosts: PropTypes.func.isRequired,
};
