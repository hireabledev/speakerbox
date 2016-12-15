import React, { Component, PropTypes } from 'react';
import Page from './common/page';
import Post from './common/post';
import AccountList from '../containers/common/account-list';

export default class StreamPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    let {
      facebookAccounts,
      twitterAccounts,
      linkedinAccounts,
      feeds,
    } = this.props.location.query;
    if (typeof facebookAccounts === 'string') { facebookAccounts = [facebookAccounts]; }
    if (typeof twitterAccounts === 'string') { twitterAccounts = [twitterAccounts]; }
    if (typeof linkedinAccounts === 'string') { linkedinAccounts = [linkedinAccounts]; }
    if (typeof feeds === 'string') { feeds = [feeds]; }
    Promise.all([
      this.props.fetchAccounts(),
      this.props.fetchFeeds(),
      this.props.fetchPosts({ facebookAccounts, twitterAccounts, linkedinAccounts, feeds }),
    ]);
  }

  render() {
    const {
      accounts = [],
      moreAccounts,
      accountVisibility,
      feeds = [],
      moreFeeds,
      feedVisibility,
      facebookPosts = [],
      moreFacebookPosts,
      twitterPosts = [],
      moreTwitterPosts,
      linkedInPosts = [],
      moreLinkedInPosts,
      rssPosts = [],
      moreRSSPosts,
    } = this.props;

    const morePosts = moreFacebookPosts || moreTwitterPosts || moreLinkedInPosts || moreRSSPosts;

    return (
      <Page bg="light">
        <div className="container">
          <div className="columns">
            <div className="column">
              {facebookPosts.map(post => <Post key={post.id} post={post} type="facebook" />)}
              {twitterPosts.map(post => <Post key={post.id} post={post} type="twitter" />)}
              {linkedInPosts.map(post => <Post key={post.id} post={post} type="linkedin" />)}
              {rssPosts.map(post => <Post key={post.id} post={post} type="rss" />)}
              {morePosts && <button onClick={this.props.fetchPosts}>Load More</button>}
            </div>
            <div className="column is-one-third">
              <AccountList
                accounts={accounts}
                moreAccounts={moreAccounts}
                accountVisibility={accountVisibility}
                feeds={feeds}
                moreFeeds={moreFeeds}
                feedVisibility={feedVisibility}
              />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

StreamPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      facebookAccounts: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      twitterAccounts: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      linkedinAccounts: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      feeds: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
    }).isRequired,
  }).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreAccounts: PropTypes.bool.isRequired,
  accountVisibility: PropTypes.object.isRequired, // eslint-disable-line
  feeds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreFeeds: PropTypes.bool.isRequired,
  feedVisibility: PropTypes.object.isRequired, // eslint-disable-line
  facebookPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreFacebookPosts: PropTypes.bool.isRequired,
  twitterPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreTwitterPosts: PropTypes.bool.isRequired,
  linkedInPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreLinkedInPosts: PropTypes.bool.isRequired,
  rssPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreRSSPosts: PropTypes.bool.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  fetchFeeds: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};
