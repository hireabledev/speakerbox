import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import StreamPage from '../components/stream-page';
import PostsQuery from '../queries/posts.gql';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default graphql(PostsQuery, {
  props({ data: { loading, posts = [], fetchMore } }) {
    return {
      loading,
      posts,
      loadMorePosts() {
        return fetchMore({
          variables: {
            offset: posts.length,
          },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return prevResult; }
            return {
              ...prevResult,
              posts: [...prevResult.posts, ...fetchMoreResult.data.posts],
            };
          },
        });
      },
    };
  },
})(connect(mapStateToProps, mapDispatchToProps)(StreamPage));
