import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import concat from 'lodash/concat';
import memoize from 'lodash/memoize';
import orderBy from 'lodash/orderBy';
import InfiniteScroll from 'react-infinite-scroller';
import Fallback from 'lib/components/fallback';
import Page from 'lib/components/page';
import AccountList from './account-list';
import ScheduledPost from './scheduled-post';
import PostForm from './post-form';
import { fetchAllScheduledPosts, resetAllScheduledPosts } from '../actions/posts';

export class StreamPage extends Component {
  constructor(props) {
    super(props);
    this.fetchScheduledPosts = this.fetchScheduledPosts.bind(this);
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

  fetchScheduledPosts(options = { query: { sort: '-date' } }) {
    const id = this.props.location.query.id;
    if (id) {
      options.query.id = id; // eslint-disable-line no-param-reassign
    }
    this.props.fetchScheduledPosts(options);
  }


  render() {
    const {
      accountVisibility,
      facebookScheduledPosts = [],
      moreFacebookScheduledPosts,
      twitterScheduledPosts = [],
      moreTwitterScheduledPosts,
      twitterScheduledRetweets = [],
      moreTwitterScheduledRetweets,
      linkedinScheduledPosts = [],
      moreLinkedinScheduledPosts,
    } = this.props;

    const posts = orderBy(
      concat(
        facebookScheduledPosts,
        twitterScheduledPosts,
        twitterScheduledRetweets,
        linkedinScheduledPosts
      ),
      'date',
      'desc'
    );

    const moreScheduledPosts = moreFacebookScheduledPosts || moreTwitterScheduledPosts
      || moreTwitterScheduledRetweets || moreLinkedinScheduledPosts;

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
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.props.fetchScheduledPosts}
          hasMore={moreScheduledPosts}
        >
          {posts
            .filter(filterPosts)
            .map(post => <ScheduledPost key={post.id} post={post} type={post.type} />)}
        </InfiniteScroll>
      </Page>
    );
  }
}

StreamPage.propTypes = {
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
  twitterScheduledRetweets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreTwitterScheduledRetweets: PropTypes.bool.isRequired,
  linkedinScheduledPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreLinkedinScheduledPosts: PropTypes.bool.isRequired,
  fetchScheduledPosts: PropTypes.func.isRequired,
  resetScheduledPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accountVisibility: state.visibility.accountVisibility,
  facebookScheduledPosts: state.facebook.scheduledPosts,
  twitterScheduledPosts: state.twitter.scheduledPosts,
  twitterScheduledRetweets: state.twitter.scheduledRetweets,
  linkedinScheduledPosts: state.linkedin.scheduledPosts,
  moreFacebookScheduledPosts: state.facebook.moreScheduledPosts,
  moreTwitterScheduledPosts: state.twitter.moreScheduledPosts,
  moreTwitterScheduledRetweets: state.twitter.moreScheduledRetweets,
  moreLinkedinScheduledPosts: state.linkedin.moreScheduledPosts,
});

const mapDispatchToProps = (dispatch) => ({
  resetScheduledPosts: (options) => dispatch(resetAllScheduledPosts(options)),
  fetchScheduledPosts: (options) => dispatch(fetchAllScheduledPosts(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
