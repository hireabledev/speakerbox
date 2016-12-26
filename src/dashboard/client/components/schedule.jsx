import React, { Component, PropTypes } from 'react';
import memoize from 'lodash/memoize';
import Page from 'lib/components/page';
import Post from 'lib/components/post';
import AccountList from 'lib/containers/account-list';

export default class StreamPage extends Component {
  componentDidMount() {
    this.props.fetchScheduledPosts();
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
      <Page
        bg="light"
        padY
        menu={
          <AccountList pathname={this.props.location.pathname} showFeeds={false} />
        }
      >
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
  fetchScheduledPosts: PropTypes.func.isRequired,
};
