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
import { fetchAllScheduledPosts } from '../actions/posts';

export class StreamPage extends Component {
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

    const filterByAccount = memoize((post) => (accountVisibility[post.accountId]));

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
            .filter(filterByAccount)
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
  fetchScheduledPosts: (options) => dispatch(fetchAllScheduledPosts(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamPage);
