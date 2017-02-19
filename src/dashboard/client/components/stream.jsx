import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import Link from 'react-router/lib/Link';
import Fallback from 'lib/client/components/fallback';
import Banner from 'lib/client/components/banner';
import Page from 'lib/client/components/page';
import Post from './post';
import AccountList from './account-list';
import { fetchPosts, resetPosts } from '../actions/posts';

export class StreamPage extends Component {
  constructor(props) {
    super(props);
    this.getWaypoint = this.getWaypoint.bind(this);
    this.getFetchOptions = this.getFetchOptions.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchPostsByAccount = this.fetchPostsByAccount.bind(this);
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

  getWaypoint(post) {
    if (this.props.morePosts) {
      return <Waypoint onEnter={() => this.fetchPostsByAccount(post.accountId)} />;
    }
    return null;
  }

  getFetchOptions(query = {}) {
    const fetchOptions = {
      query: {
        sort: '-date',
        limit: 5,
        ...query,
      },
    };
    if (this.props.location.pathname === '/favorites') {
      fetchOptions.query.favorited = true;
    }
    return fetchOptions;
  }

  fetchPosts() {
    return this.props.fetchPosts(this.getFetchOptions());
  }

  fetchPostsByAccount(accountId) {
    return this.props.fetchPosts(this.getFetchOptions({ limit: 10, accountId }));
  }

  render() {
    const {
      accountVisibility,
      feedVisibility,
      posts = [],
    } = this.props;

    const filteredPosts = posts.filter((post) => {
      if (post.type === 'rss') {
        return feedVisibility[post.feedId];
      }
      return accountVisibility[post.accountId];
    });

    const lastPosts = filteredPosts.reduce((result, post) => {
      if (post.accountId) {
        result[post.accountId] = post; // eslint-disable-line no-param-reassign
      } else if (post.feedId) {
        result[post.feedId] = post; // eslint-disable-line no-param-reassign
      }
      return result;
    }, {});

    const numberOfAds = Math.ceil(filteredPosts.length / 10);

    for (let i = 1; i < numberOfAds; i += 1) {
      const ad = { isBanner: true };
      filteredPosts.splice(i * 10, 0, ad);
    }

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
        {filteredPosts
          .map((post, index) => {
            if (post.isBanner) {
              return (
                <Banner
                  key={index}
                  className="sb-bn-center my-3 mx-auto"
                  layout="landscape"
                />
              );
            }
            return (
              <Post
                key={post.id}
                post={post}
                type={post.type}
                waypoint={
                  (lastPosts[post.accountId] === post || lastPosts[post.feedId] === post)
                    ? this.getWaypoint(post)
                    : null
                }
              />
            );
          })}
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
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  morePosts: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  resetPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accountVisibility: state.visibility.accountVisibility,
  feedVisibility: state.visibility.feedVisibility,
  posts: state.posts.posts,
  morePosts: state.posts.morePosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (options) => dispatch(fetchPosts(options)),
  resetPosts: () => dispatch(resetPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
