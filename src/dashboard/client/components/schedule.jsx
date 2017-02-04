import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import concat from 'lodash/concat';
import includes from 'lodash/includes';
import last from 'lodash/last';
import memoize from 'lodash/memoize';
import orderBy from 'lodash/orderBy';
import sortedUniqBy from 'lodash/sortedUniqBy';
import Waypoint from 'react-waypoint';
import Fallback from 'lib/client/components/fallback';
import Page from 'lib/client/components/page';
import AccountList from './account-list';
import ScheduledPost from './scheduled-post';
import PostForm from './post-form';
import {
  facebook,
  twitter,
  linkedin,
  fetchAllScheduledPosts,
  resetAllScheduledPosts,
} from '../actions/posts';

export class SchedulePage extends Component {
  constructor(props) {
    super(props);
    this.getWaypoint = this.getWaypoint.bind(this);
    this.getFetchOptions = this.getFetchOptions.bind(this);
    this.fetchScheduledPosts = this.fetchScheduledPosts.bind(this);
    this.fetchScheduledPostsByType = this.fetchScheduledPostsByType.bind(this);
    this.onRemoveScheduledPost = this.onRemoveScheduledPost.bind(this);
  }

  componentDidMount() {
    this.fetchScheduledPosts();
  }

  componentDidUpdate(prevProps) {
    const differentPathname = prevProps.location.pathname !== this.props.location.pathname;
    const differentQuery = prevProps.location.query !== this.props.location.query;
    if (differentPathname || differentQuery) {
      this.props.resetScheduledPosts();
      this.fetchScheduledPosts();
    }
  }

  onRemoveScheduledPost() {
    if (this.props.location.query.id) {
      this.props.resetScheduledPosts();
      this.fetchScheduledPosts();
    }
  }

  getWaypoint(post) {
    const moreMap = {
      facebook: this.props.moreFacebookScheduledPosts,
      twitter: this.props.moreTwitterScheduledPosts,
      linkedin: this.props.moreLinkedinScheduledPosts,
    };
    return (
      <Waypoint
        onEnter={() => {
          const { type } = post;
          if (moreMap[type]) {
            this.fetchScheduledPostsByType(type);
          }
        }}
      />
    );
  }

  getFetchOptions(options = { limit: 5 }) {
    const fetchOptions = {
      query: {
        sort: 'date',
        limit: options.limit,
      },
    };
    const id = this.props.location.query.id;
    if (id) {
      fetchOptions.query.id = id;
    }
    return fetchOptions;
  }

  fetchScheduledPosts() {
    return this.props.fetchScheduledPosts(this.getFetchOptions());
  }

  fetchScheduledPostsByType(type) {
    return this.props.fetchScheduledPostsByType(type)(this.getFetchOptions({ limit: 10 }));
  }

  render() {
    const {
      accountVisibility,
      facebookScheduledPosts = [],
      twitterScheduledPosts = [],
      linkedinScheduledPosts = [],
    } = this.props;

    const posts = sortedUniqBy( // TODO: handle in reducer
      orderBy(
        concat(
          facebookScheduledPosts,
          twitterScheduledPosts,
          linkedinScheduledPosts
        ),
        'date',
        'asc'
      ),
      'id',
    );

    const lastScheduledPosts = [
      last(facebookScheduledPosts),
      last(twitterScheduledPosts),
      last(linkedinScheduledPosts),
    ];

    const queryId = this.props.location.query.id;

    const filterPosts = memoize((post) => {
      if (queryId && post.id !== queryId) {
        return false;
      }
      return accountVisibility[post.accountId];
    });

    return (
      <Page
        bg="light"
        padY
        menu={
          <AccountList pathname={this.props.location.pathname} showFeeds={false} />
        }
        sidebarSecondary={<div />}
      >
        <PostForm message={this.props.location.query.message} />
        <br />
        <Fallback if={posts.length === 0}>
          No scheduled posts. Add one?
        </Fallback>
        {posts
          .filter(filterPosts)
          .map(post => (
            <ScheduledPost
              key={post.id}
              post={post}
              type={post.type}
              onRemove={this.onRemoveScheduledPost}
              waypoint={includes(lastScheduledPosts, post) ? this.getWaypoint(post) : null}
            />))}
      </Page>
    );
  }
}

SchedulePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
    }).isRequired,
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
  fetchScheduledPostsByType: PropTypes.func.isRequired,
  resetScheduledPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accountVisibility: state.visibility.accountVisibility,
  facebookScheduledPosts: state.facebook.scheduledPosts,
  twitterScheduledPosts: state.twitter.scheduledPosts,
  linkedinScheduledPosts: state.linkedin.scheduledPosts,
  moreFacebookScheduledPosts: state.facebook.moreScheduledPosts,
  moreTwitterScheduledPosts: state.twitter.moreScheduledPosts,
  moreLinkedinScheduledPosts: state.linkedin.moreScheduledPosts,
});

const mapDispatchToProps = (dispatch) => ({
  resetScheduledPosts: (options) => dispatch(resetAllScheduledPosts(options)),
  fetchScheduledPosts: (options) => dispatch(fetchAllScheduledPosts(options)),
  fetchScheduledPostsByType: (type) => (options) => {
    const typeMap = { facebook, twitter, linkedin };
    return dispatch(typeMap[type].fetchScheduledPosts(options));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
