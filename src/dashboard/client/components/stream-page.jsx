import React, { Component, PropTypes } from 'react';
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
              <AccountList />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

StreamPage.propTypes = {
  facebookPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreFacebookPosts: PropTypes.bool.isRequired,
  twitterPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreTwitterPosts: PropTypes.bool.isRequired,
  linkedInPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreLinkedInPosts: PropTypes.bool.isRequired,
  rssPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreRSSPosts: PropTypes.bool.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  fetchFeeds: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};
