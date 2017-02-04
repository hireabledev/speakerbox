import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import concat from 'lodash/concat';
import includes from 'lodash/includes';
import last from 'lodash/last';
import memoize from 'lodash/memoize';
import orderBy from 'lodash/orderBy';
import Waypoint from 'react-waypoint';
import Link from 'react-router/lib/Link';
import Fallback from 'lib/client/components/fallback';
import Page from 'lib/client/components/page';
import Post from './post';
import AccountList from './account-list';
import {
  facebook,
  twitter,
  linkedin,
  rss,
  fetchAllPosts,
  resetAllPosts,
} from '../actions/posts';

export class StreamPage extends Component {
  constructor(props) {
    super(props);
    this.getWaypoint = this.getWaypoint.bind(this);
    this.getFetchOptions = this.getFetchOptions.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchPostsByType = this.fetchPostsByType.bind(this);
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
    const moreMap = {
      facebook: this.props.moreFacebookPosts,
      twitter: this.props.moreTwitterPosts,
      linkedin: this.props.moreLinkedinPosts,
      rss: this.props.moreRSSPosts,
    };
    return (
      <Waypoint
        onEnter={() => {
          const { type } = post;
          if (moreMap[type]) {
            this.fetchPostsByType(type);
          }
        }}
      />
    );
  }

  getFetchOptions(options = { limit: 5 }) {
    const fetchOptions = {
      query: {
        sort: '-date',
        limit: options.limit,
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

  fetchPostsByType(type) {
    return this.props.fetchPostsByType(type)(this.getFetchOptions({ limit: 10 }));
  }

  render() {
    const {
      accountVisibility,
      feedVisibility,
      facebookPosts = [],
      twitterPosts = [],
      linkedinPosts = [],
      rssPosts = [],
    } = this.props;

    const posts = orderBy(
      concat(facebookPosts, twitterPosts, linkedinPosts, rssPosts),
      'date',
      'desc'
    );

    const lastPosts = [
      last(facebookPosts),
      last(twitterPosts),
      last(linkedinPosts),
      last(rssPosts),
    ];

    const filterByAccountOrFeed = memoize((post) => {
      if (post.type === 'rss') {
        return feedVisibility[post.feedId];
      }
      return accountVisibility[post.accountId];
    });

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
        {posts
          .filter(filterByAccountOrFeed)
          .map(post => (
            <Post
              key={post.id}
              post={post}
              type={post.type}
              waypoint={includes(lastPosts, post) ? this.getWaypoint(post) : null}
            />)
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
  fetchPostsByType: PropTypes.func.isRequired,
  resetPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accountVisibility: state.visibility.accountVisibility,
  feedVisibility: state.visibility.feedVisibility,
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
  fetchPostsByType: (type) => (options) => {
    const typeMap = { facebook, twitter, linkedin, rss };
    return dispatch(typeMap[type].fetchPosts(options));
  },
  resetPosts: () => dispatch(resetAllPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
