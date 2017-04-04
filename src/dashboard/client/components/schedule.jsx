import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import InfiniteScroll from 'react-infinite-scroller';
import Fallback from 'lib/client/components/fallback';
import Page from './page';
import AccountList from './account-list';
import ScheduledPost from './scheduled-post';
import PostForm from './post-form';
import { fetchScheduledPosts, resetScheduledPosts } from '../actions/posts';

export class SchedulePage extends Component {
  constructor(props) {
    super(props);
    this.getFetchOptions = this.getFetchOptions.bind(this);
    this.fetchScheduledPosts = this.fetchScheduledPosts.bind(this);
    this.onRemoveScheduledPost = this.onRemoveScheduledPost.bind(this);
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

  getFetchOptions(query = {}) {
    const fetchOptions = {
      query: {
        sort: 'date',
        limit: 5,
        ...query,
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

  render() {
    const {
      accountVisibility,
      scheduledPosts = [],
    } = this.props;

    const queryId = this.props.location.query.id;

    const filteredScheduledPosts = scheduledPosts.filter((post) => {
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
        <PostForm
          message={this.props.location.query.message}
          onSuccess={() => (
            this.props.router.replace({
              pathname: this.props.location.pathname,
            })
          )}
        />
        <br />
        <Fallback if={filteredScheduledPosts.length === 0}>
          No scheduled posts. Add one?
        </Fallback>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchScheduledPosts}
          hasMore={this.props.moreScheduledPosts}
        >
          {filteredScheduledPosts
            .map((scheduledPost) => (
              <ScheduledPost
                key={scheduledPost.id}
                post={scheduledPost}
                type={scheduledPost.type}
                onRemove={this.onRemoveScheduledPost}
              />
            ))}
        </InfiniteScroll>
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
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  accountVisibility: PropTypes.object,
  scheduledPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  })).isRequired,
  moreScheduledPosts: PropTypes.bool.isRequired,
  fetchScheduledPosts: PropTypes.func.isRequired,
  resetScheduledPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accountVisibility: state.visibility.accountVisibility,
  scheduledPosts: state.posts.scheduledPosts,
  moreScheduledPosts: state.posts.moreScheduledPosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchScheduledPosts: (options) => dispatch(fetchScheduledPosts(options)),
  resetScheduledPosts: (options) => dispatch(resetScheduledPosts(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SchedulePage));
