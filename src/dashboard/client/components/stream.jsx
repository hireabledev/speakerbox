import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import concat from 'lodash/concat';
import memoize from 'lodash/memoize';
import Link from 'react-router/lib/Link';
import Fallback from 'lib/components/fallback';
import Page from 'lib/components/page';
import Post from './post';
import AccountList from './account-list';
import { fetchAllPosts, resetAllPosts } from '../actions/posts';

export class StreamPage extends Component {
  constructor(props) {
    super(props);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.resetPosts();
      this.fetchPosts();
    }
  }

  fetchPosts() {
    const options = {};

    if (this.props.location.pathname === '/favorites') {
      options.query = { favorited: true };
    }

    this.props.fetchPosts(options);
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

    const posts = concat(facebookPosts, twitterPosts, linkedinPosts, rssPosts);
    const morePosts = moreFacebookPosts || moreTwitterPosts || moreLinkedinPosts || moreRSSPosts;

    const filterByAccount = memoize((post) => (accountVisibility[post.accountId]));
    const filterByFeed = memoize((post) => (feedVisibility[post.rssFeedId]));

    return (
      <Page
        bg="light"
        padY
        menu={
          <AccountList pathname={this.props.location.pathname} />
        }
        sidebarSecondary={<div />}
      >
        <Fallback if={posts.length === 0}>
          No posts. <Link to="/settings/accounts">Add an account?</Link>
        </Fallback>
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
        {morePosts && (
          <button className="btn btn-primary" onClick={this.props.fetchPosts}>Load More</button>
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
  fetchPosts: PropTypes.func.isRequired,
  resetPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accountVisibility: state.accounts.accountVisibility,
  feedVisibility: state.rss.feedVisibility,
  facebookPosts: state.facebook.posts,
  twitterPosts: state.twitter.posts,
  linkedinPosts: state.linkedin.posts,
  rssPosts: state.rss.posts,
  moreFacebookPosts: state.facebook.morePosts,
  moreTwitterPosts: state.twitter.morePosts,
  moreLinkedinPosts: state.linkedin.morePosts,
  moreRSSPosts: state.rss.morePosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (options) => dispatch(fetchAllPosts(options)),
  resetPosts: () => dispatch(resetAllPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
